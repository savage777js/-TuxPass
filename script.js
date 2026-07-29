/* ==========================================================================
   TuxPass - Linux Password Generator & Encrypted Vault Manager
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- STATE MANAGEMENT ---
    const state = {
        currentPassword: '',
        theme: 'theme-arch',
        audioEnabled: false,
        visible: true,
        history: [],
        masterPassword: null,
        derivedCryptoKey: null,
        vaultUnlocked: false,
        vaultAccounts: [], // Array of { id, service, username, password, category, url, updatedAt }
        words: [
            'arch', 'kernel', 'terminal', 'cyber', 'matrix', 'tux', 'linux', 'shadow', 'packet', 'shell',
            'quantum', 'system', 'root', 'binary', 'crypto', 'vector', 'buffer', 'socket', 'signal', 'dragon',
            'entropy', 'phoenix', 'subnet', 'router', 'daemon', 'module', 'cipher', 'proton', 'galaxy', 'docker',
            'server', 'firewall', 'gateway', 'nebula', 'starlight', 'voyager', 'falcon', 'titan', 'aurora', 'nexus'
        ],
        natoMap: {
            'a': 'Alpha', 'b': 'Bravo', 'c': 'Charlie', 'd': 'Delta', 'e': 'Echo', 'f': 'Foxtrot',
            'g': 'Golf', 'h': 'Hotel', 'i': 'India', 'j': 'Juliet', 'k': 'Kilo', 'l': 'Lima',
            'm': 'Mike', 'n': 'November', 'o': 'Oscar', 'p': 'Papa', 'q': 'Quebec', 'r': 'Romeo',
            's': 'Sierra', 't': 'Tango', 'u': 'Uniform', 'v': 'Victor', 'w': 'Whiskey', 'x': 'X-ray',
            'y': 'Yankee', 'z': 'Zulu',
            '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
            '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine'
        }
    };

    // --- DOM ELEMENTS ---
    const themeSelect = document.getElementById('themeSelect');
    const systemClock = document.getElementById('systemClock');
    const passwordOutput = document.getElementById('passwordOutput');
    const btnCopy = document.getElementById('btnCopy');
    const btnGenerate = document.getElementById('btnGenerate');
    const btnSaveToVaultQuick = document.getElementById('btnSaveToVaultQuick');
    const btnToggleVisibility = document.getElementById('btnToggleVisibility');
    const btnAudioToggle = document.getElementById('btnAudioToggle');
    const strengthText = document.getElementById('strengthText');
    const entropyVal = document.getElementById('entropyVal');
    const crackTimeVal = document.getElementById('crackTimeVal');
    const meterFill = document.getElementById('meterFill');
    const phoneticOutput = document.getElementById('phoneticOutput');
    const historyList = document.getElementById('historyList');
    const btnClearHistory = document.getElementById('btnClearHistory');
    const toastNotification = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMsg');
    const vaultLockStatus = document.getElementById('vaultLockStatus');

    // Controls
    const lengthSlider = document.getElementById('lengthSlider');
    const lengthVal = document.getElementById('lengthVal');
    const chkUpper = document.getElementById('chkUpper');
    const chkLower = document.getElementById('chkLower');
    const chkNumbers = document.getElementById('chkNumbers');
    const chkSymbols = document.getElementById('chkSymbols');
    const chkAmbiguous = document.getElementById('chkAmbiguous');
    const chkStrict = document.getElementById('chkStrict');
    const customSymbols = document.getElementById('customSymbols');
    const wordCountSlider = document.getElementById('wordCountSlider');
    const wordCountVal = document.getElementById('wordCountVal');
    const passphraseSeparator = document.getElementById('passphraseSeparator');
    const passphraseOptions = document.getElementById('passphraseOptions');

    // Vault DOM
    const vaultSearchInput = document.getElementById('vaultSearchInput');
    const vaultCategoryFilter = document.getElementById('vaultCategoryFilter');
    const btnAddNewAccount = document.getElementById('btnAddNewAccount');
    const btnLockVault = document.getElementById('btnLockVault');
    const btnExportVault = document.getElementById('btnExportVault');
    const btnImportVault = document.getElementById('btnImportVault');
    const vaultFileInput = document.getElementById('vaultFileInput');
    const vaultTableBody = document.getElementById('vaultTableBody');
    const statTotalAccounts = document.getElementById('statTotalAccounts');
    const statOldPasswords = document.getElementById('statOldPasswords');

    // Modals DOM
    const accountModal = document.getElementById('accountModal');
    const accountForm = document.getElementById('accountForm');
    const accEditId = document.getElementById('accEditId');
    const accService = document.getElementById('accService');
    const accUsername = document.getElementById('accUsername');
    const accPassword = document.getElementById('accPassword');
    const accCategory = document.getElementById('accCategory');
    const accUrl = document.getElementById('accUrl');
    const btnFillGeneratedPass = document.getElementById('btnFillGeneratedPass');
    const btnCloseAccountModal = document.getElementById('btnCloseAccountModal');
    const btnCancelAccountModal = document.getElementById('btnCancelAccountModal');
    const modalTitle = document.getElementById('modalTitle');

    const masterLockModal = document.getElementById('masterLockModal');
    const masterPassInput = document.getElementById('masterPassInput');
    const btnUnlockVault = document.getElementById('btnUnlockVault');
    const masterErrorMsg = document.getElementById('masterErrorMsg');

    // Tabs
    const modeBtns = document.querySelectorAll('.mode-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // --- INITIALIZATION ---
    function init() {
        startClock();
        loadHistory();
        setupEventListeners();
        generatePassword();

        // Check if vault exists
        const savedVault = localStorage.getItem('tuxpass_encrypted_vault');
        if (!savedVault) {
            // First time setup
            openMasterLockModal(true);
        } else {
            openMasterLockModal(false);
        }
    }

    // --- CLOCK ---
    function startClock() {
        const update = () => {
            const now = new Date();
            systemClock.textContent = now.toTimeString().split(' ')[0];
        };
        update();
        setInterval(update, 1000);
    }

    // --- AUDIO FX ---
    function playKeyClick() {
        if (!state.audioEnabled) return;
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.04);
        } catch (e) {}
    }

    // --- CSPRNG RANDOM HELPER ---
    function getSecureRandomInt(max) {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array[0] % max;
    }

    // --- AES-256-GCM VAULT ENCRYPTION ENGINE ---
    async function deriveCryptoKey(masterPassword, salt) {
        const encoder = new TextEncoder();
        const keyMaterial = await window.crypto.subtle.importKey(
            'raw',
            encoder.encode(masterPassword),
            'PBKDF2',
            false,
            ['deriveKey']
        );
        return window.crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
    }

    async function saveEncryptedVault() {
        if (!state.vaultUnlocked || !state.derivedCryptoKey) return;
        try {
            const encoder = new TextEncoder();
            const dataStr = JSON.stringify(state.vaultAccounts);
            const iv = window.crypto.getRandomValues(new Uint8Array(12));

            const encryptedBuffer = await window.crypto.subtle.encrypt(
                { name: 'AES-GCM', iv: iv },
                state.derivedCryptoKey,
                encoder.encode(dataStr)
            );

            // Fetch stored salt
            let saltHex = localStorage.getItem('tuxpass_vault_salt');
            if (!saltHex) {
                const salt = window.crypto.getRandomValues(new Uint8Array(16));
                saltHex = buf2hex(salt);
                localStorage.setItem('tuxpass_vault_salt', saltHex);
            }

            const vaultPayload = {
                v: 1,
                salt: saltHex,
                iv: buf2hex(iv),
                ciphertext: buf2hex(new Uint8Array(encryptedBuffer))
            };

            localStorage.setItem('tuxpass_encrypted_vault', JSON.stringify(vaultPayload));
        } catch (e) {
            showToast('Error al guardar bóveda encriptada');
        }
    }

    async function unlockVault(masterPassword) {
        const savedVaultStr = localStorage.getItem('tuxpass_encrypted_vault');

        if (!savedVaultStr) {
            // First time setup - Create salt and store initial empty vault
            const salt = window.crypto.getRandomValues(new Uint8Array(16));
            const saltHex = buf2hex(salt);
            localStorage.setItem('tuxpass_vault_salt', saltHex);

            state.masterPassword = masterPassword;
            state.derivedCryptoKey = await deriveCryptoKey(masterPassword, salt);
            state.vaultAccounts = [];
            state.vaultUnlocked = true;
            await saveEncryptedVault();
            onVaultUnlocked();
            return true;
        }

        try {
            const vaultPayload = JSON.parse(savedVaultStr);
            const salt = hex2buf(vaultPayload.salt);
            const iv = hex2buf(vaultPayload.iv);
            const ciphertext = hex2buf(vaultPayload.ciphertext);

            const key = await deriveCryptoKey(masterPassword, salt);
            const decryptedBuffer = await window.crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: iv },
                key,
                ciphertext
            );

            const decoder = new TextDecoder();
            const decryptedStr = decoder.decode(decryptedBuffer);
            state.vaultAccounts = JSON.parse(decryptedStr);
            state.masterPassword = masterPassword;
            state.derivedCryptoKey = key;
            state.vaultUnlocked = true;

            onVaultUnlocked();
            return true;
        } catch (e) {
            return false; // Invalid password
        }
    }

    function lockVault() {
        state.vaultUnlocked = false;
        state.masterPassword = null;
        state.derivedCryptoKey = null;
        state.vaultAccounts = [];
        vaultLockStatus.className = 'status-badge status-secure';
        vaultLockStatus.innerHTML = '<i class="fa-solid fa-lock"></i> Bóveda Bloqueada';
        renderVaultTable();
        openMasterLockModal(false);
    }

    function onVaultUnlocked() {
        masterLockModal.classList.add('hidden');
        vaultLockStatus.className = 'status-badge status-secure';
        vaultLockStatus.innerHTML = '<i class="fa-solid fa-lock-open"></i> Bóveda Desbloqueada';
        renderVaultTable();
        showToast('¡Bóveda personal desbloqueada!');
    }

    function buf2hex(buffer) {
        return Array.from(buffer).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    function hex2buf(hexString) {
        const bytes = new Uint8Array(hexString.length / 2);
        for (let i = 0; i < hexString.length; i += 2) {
            bytes[i / 2] = parseInt(hexString.substr(i, 2), 16);
        }
        return bytes;
    }

    // --- VAULT TABLE RENDER & CRUD ---
    function renderVaultTable() {
        if (!state.vaultUnlocked) {
            vaultTableBody.innerHTML = `
                <div class="empty-vault-msg">
                    <i class="fa-solid fa-lock empty-icon"></i>
                    <p>La bóveda está bloqueada.</p>
                    <small>Ingresa tu Contraseña Maestra para ver tus registros.</small>
                </div>`;
            statTotalAccounts.textContent = '0';
            statOldPasswords.textContent = '0';
            return;
        }

        const query = vaultSearchInput.value.toLowerCase().trim();
        const categoryFilter = vaultCategoryFilter.value;

        const filtered = state.vaultAccounts.filter(acc => {
            const matchQuery = !query || 
                acc.service.toLowerCase().includes(query) || 
                (acc.username && acc.username.toLowerCase().includes(query)) ||
                (acc.url && acc.url.toLowerCase().includes(query));
            const matchCat = categoryFilter === 'ALL' || acc.category === categoryFilter;
            return matchQuery && matchCat;
        });

        statTotalAccounts.textContent = state.vaultAccounts.length;

        // Check old passwords (> 90 days)
        const now = Date.now();
        const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;
        let oldPassCount = 0;

        if (filtered.length === 0) {
            vaultTableBody.innerHTML = `
                <div class="empty-vault-msg">
                    <i class="fa-solid fa-vault empty-icon"></i>
                    <p>${state.vaultAccounts.length === 0 ? 'Tu bóveda local está vacía.' : 'No se encontraron resultados para la búsqueda.'}</p>
                    <small>Haz clic en <strong>"Nueva Cuenta"</strong> para agregar servicios y contraseñas.</small>
                </div>`;
            statOldPasswords.textContent = '0';
            return;
        }

        vaultTableBody.innerHTML = '';
        filtered.forEach(acc => {
            const ageMs = now - (acc.updatedAt || now);
            const isOld = ageMs > ninetyDaysMs;
            if (isOld) oldPassCount++;

            const dateStr = acc.updatedAt ? new Date(acc.updatedAt).toLocaleDateString('es-ES') : 'Hoy';

            const row = document.createElement('div');
            row.className = 'vault-row';
            row.innerHTML = `
                <span class="col-service"><i class="fa-solid fa-globe"></i> ${escapeHtml(acc.service)}</span>
                <span class="col-user">${escapeHtml(acc.username || '—')}</span>
                <span class="col-pass">
                    <span class="pass-hidden" id="passMask-${acc.id}">••••••••••••</span>
                    <button class="btn-icon-sm btn-reveal" data-id="${acc.id}" title="Ver / Ocultar"><i class="fa-solid fa-eye"></i></button>
                    <button class="btn-icon-sm btn-copy-acc" data-id="${acc.id}" title="Copiar Contraseña"><i class="fa-regular fa-copy"></i></button>
                </span>
                <span class="col-cat"><span class="badge-cat ${acc.category}">${acc.category}</span></span>
                <span class="col-date ${isOld ? 'warning-old' : ''}">${dateStr} ${isOld ? '<i class="fa-solid fa-triangle-exclamation" title="Sugerencia: Actualizar contraseña antígua"></i>' : ''}</span>
                <span class="col-actions">
                    <button class="btn-icon-sm btn-edit-acc" data-id="${acc.id}" title="Editar"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-icon-sm danger btn-del-acc" data-id="${acc.id}" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
                </span>
            `;
            vaultTableBody.appendChild(row);
        });

        statOldPasswords.textContent = oldPassCount;

        // Row Event Listeners
        document.querySelectorAll('.btn-reveal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = btn.dataset.id;
                const acc = state.vaultAccounts.find(a => a.id === id);
                const maskEl = document.getElementById(`passMask-${id}`);
                if (acc && maskEl) {
                    if (maskEl.textContent === '••••••••••••') {
                        maskEl.textContent = acc.password;
                        maskEl.style.color = 'var(--accent-secondary)';
                        btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
                    } else {
                        maskEl.textContent = '••••••••••••';
                        maskEl.style.color = 'var(--text-muted)';
                        btn.innerHTML = '<i class="fa-solid fa-eye"></i>';
                    }
                }
            });
        });

        document.querySelectorAll('.btn-copy-acc').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const acc = state.vaultAccounts.find(a => a.id === id);
                if (acc) {
                    copyToClipboard(acc.password);
                    showToast(`Contraseña de ${acc.service} copiada!`);
                }
            });
        });

        document.querySelectorAll('.btn-edit-acc').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const acc = state.vaultAccounts.find(a => a.id === id);
                if (acc) openAccountModal(acc);
            });
        });

        document.querySelectorAll('.btn-del-acc').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.dataset.id;
                const acc = state.vaultAccounts.find(a => a.id === id);
                if (acc && confirm(`¿Seguro que deseas eliminar la cuenta de ${acc.service}?`)) {
                    state.vaultAccounts = state.vaultAccounts.filter(a => a.id !== id);
                    await saveEncryptedVault();
                    renderVaultTable();
                    showToast('Cuenta eliminada de la bóveda');
                }
            });
        });
    }

    function openAccountModal(accToEdit = null) {
        if (!state.vaultUnlocked) {
            openMasterLockModal(false);
            return;
        }

        if (accToEdit) {
            modalTitle.innerHTML = '<i class="fa-solid fa-pen"></i> Editar Cuenta en Bóveda';
            accEditId.value = accToEdit.id;
            accService.value = accToEdit.service;
            accUsername.value = accToEdit.username || '';
            accPassword.value = accToEdit.password;
            accCategory.value = accToEdit.category || 'Personal';
            accUrl.value = accToEdit.url || '';
        } else {
            modalTitle.innerHTML = '<i class="fa-solid fa-folder-plus"></i> Guardar Cuenta en Bóveda';
            accEditId.value = '';
            accService.value = '';
            accUsername.value = '';
            accPassword.value = state.currentPassword || '';
            accCategory.value = 'Personal';
            accUrl.value = '';
        }

        accountModal.classList.remove('hidden');
        accService.focus();
    }

    function closeAccountModal() {
        accountModal.classList.add('hidden');
    }

    async function handleAccountFormSubmit(e) {
        e.preventDefault();
        const id = accEditId.value || 'acc_' + Date.now() + '_' + getSecureRandomInt(1000);
        const service = accService.value.trim();
        const username = accUsername.value.trim();
        const password = accPassword.value;
        const category = accCategory.value;
        const url = accUrl.value.trim();

        if (!service || !password) {
            showToast('Por favor completa el nombre del servicio y la contraseña');
            return;
        }

        const existingIndex = state.vaultAccounts.findIndex(a => a.id === id);
        const newAccount = {
            id,
            service,
            username,
            password,
            category,
            url,
            updatedAt: Date.now()
        };

        if (existingIndex >= 0) {
            state.vaultAccounts[existingIndex] = newAccount;
        } else {
            state.vaultAccounts.unshift(newAccount);
        }

        await saveEncryptedVault();
        closeAccountModal();
        renderVaultTable();
        showToast(`¡Cuenta de ${service} guardada en bóveda!`);
    }

    function openMasterLockModal(isSetup = false) {
        masterPassInput.value = '';
        masterErrorMsg.classList.add('hidden');

        const descEl = masterLockModal.querySelector('.master-desc');
        if (isSetup) {
            descEl.innerHTML = '¡Bienvenido a <strong>TuxPass</strong>! Crea tu <strong>Contraseña Maestra</strong> personal para proteger y encriptar tu bóveda local de contraseñas (AES-256).';
            btnUnlockVault.innerHTML = '<i class="fa-solid fa-lock"></i> Crear Bóveda y Guardar';
        } else {
            descEl.innerHTML = 'Ingresa tu <strong>Contraseña Maestra</strong> para desencriptar tus contraseñas personales guardadas localmente.';
            btnUnlockVault.innerHTML = '<i class="fa-solid fa-key"></i> Desbloquear Bóveda';
        }

        masterLockModal.classList.remove('hidden');
        masterPassInput.focus();
    }

    async function handleMasterUnlock() {
        const pass = masterPassInput.value.trim();
        if (!pass) {
            masterErrorMsg.textContent = 'Por favor ingresa tu contraseña maestra.';
            masterErrorMsg.classList.remove('hidden');
            return;
        }

        btnUnlockVault.disabled = true;
        btnUnlockVault.textContent = 'Desencriptando...';

        const success = await unlockVault(pass);
        btnUnlockVault.disabled = false;

        if (!success) {
            masterErrorMsg.textContent = 'Contraseña maestra incorrecta. Inténtalo de nuevo.';
            masterErrorMsg.classList.remove('hidden');
            playKeyClick();
        }
    }

    // --- PASSWORD GENERATOR LOGIC ---
    function generatePassword() {
        const genType = document.querySelector('input[name="genType"]:checked').value;
        let password = '';

        if (genType === 'passphrase') {
            const count = parseInt(wordCountSlider.value, 10);
            const sep = passphraseSeparator.value;
            const chosenWords = [];
            for (let i = 0; i < count; i++) {
                const word = state.words[getSecureRandomInt(state.words.length)];
                chosenWords.push(word);
            }
            password = chosenWords.join(sep);
        } else if (genType === 'pronounceable') {
            const len = parseInt(lengthSlider.value, 10);
            const vowels = 'aeiou';
            const consonants = 'bcdfghjklmnpqrstvwxyz';
            let isVowel = getSecureRandomInt(2) === 0;

            for (let i = 0; i < len; i++) {
                if (isVowel) {
                    password += vowels[getSecureRandomInt(vowels.length)];
                } else {
                    password += consonants[getSecureRandomInt(consonants.length)];
                }
                isVowel = !isVowel;
            }
            password = password.charAt(0).toUpperCase() + password.slice(1);
            if (chkNumbers.checked) password += getSecureRandomInt(99).toString();
            if (chkSymbols.checked) password += '!@#'[getSecureRandomInt(3)];

        } else if (genType === 'pin') {
            const len = parseInt(lengthSlider.value, 10);
            const digits = '0123456789';
            for (let i = 0; i < len; i++) {
                password += digits[getSecureRandomInt(digits.length)];
            }
        } else {
            let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let lower = 'abcdefghijklmnopqrstuvwxyz';
            let numbers = '0123456789';
            let symbols = customSymbols.value || '!@#$%^&*()_+-=[]{}|;:,.<>?';

            if (chkAmbiguous.checked) {
                upper = upper.replace(/[IO]/g, '');
                lower = lower.replace(/[l]/g, '');
                numbers = numbers.replace(/[01]/g, '');
            }

            let pool = '';
            const activeSets = [];

            if (chkUpper.checked) { pool += upper; activeSets.push(upper); }
            if (chkLower.checked) { pool += lower; activeSets.push(lower); }
            if (chkNumbers.checked) { pool += numbers; activeSets.push(numbers); }
            if (chkSymbols.checked) { pool += symbols; activeSets.push(symbols); }

            if (!pool) {
                pool = lower;
                activeSets.push(lower);
            }

            const len = parseInt(lengthSlider.value, 10);

            if (chkStrict.checked && activeSets.length > 0 && len >= activeSets.length) {
                const tempChars = [];
                activeSets.forEach(set => {
                    tempChars.push(set[getSecureRandomInt(set.length)]);
                });
                while (tempChars.length < len) {
                    tempChars.push(pool[getSecureRandomInt(pool.length)]);
                }
                for (let i = tempChars.length - 1; i > 0; i--) {
                    const j = getSecureRandomInt(i + 1);
                    [tempChars[i], tempChars[j]] = [tempChars[j], tempChars[i]];
                }
                password = tempChars.join('');
            } else {
                for (let i = 0; i < len; i++) {
                    password += pool[getSecureRandomInt(pool.length)];
                }
            }
        }

        state.currentPassword = password;
        updateUI();
        addToHistory(password);
        playKeyClick();
    }

    // --- UI UPDATE & METRICS ---
    function updateUI() {
        if (state.visible) {
            passwordOutput.textContent = state.currentPassword;
        } else {
            passwordOutput.textContent = '•'.repeat(state.currentPassword.length);
        }

        const metrics = calculateEntropy(state.currentPassword);
        entropyVal.textContent = `${metrics.entropy} bits`;
        crackTimeVal.textContent = metrics.crackTime;
        strengthText.textContent = metrics.label;
        strengthText.style.color = metrics.color;

        meterFill.style.width = `${metrics.percentage}%`;
        meterFill.style.backgroundColor = metrics.color;

        updatePhonetics(state.currentPassword);
    }

    function calculateEntropy(pass) {
        if (!pass) return { entropy: 0, crackTime: 'Instantáneo', label: 'Sin datos', color: '#8b949e', percentage: 0 };

        let poolSize = 0;
        if (/[a-z]/.test(pass)) poolSize += 26;
        if (/[A-Z]/.test(pass)) poolSize += 26;
        if (/[0-9]/.test(pass)) poolSize += 10;
        if (/[^a-zA-Z0-9]/.test(pass)) poolSize += 32;

        if (poolSize === 0) poolSize = 26;

        const entropy = Math.round(pass.length * Math.log2(poolSize));
        const combinations = Math.pow(poolSize, pass.length);
        const seconds = combinations / 100000000000;

        let crackTime = 'Instantáneo';
        if (seconds > 315360000000) crackTime = '> 10,000 siglos';
        else if (seconds > 31536000) crackTime = `${Math.round(seconds / 31536000)} años`;
        else if (seconds > 86400) crackTime = `${Math.round(seconds / 86400)} días`;
        else if (seconds > 3600) crackTime = `${Math.round(seconds / 3600)} horas`;
        else if (seconds > 60) crackTime = `${Math.round(seconds / 60)} mins`;
        else if (seconds > 1) crackTime = `${Math.round(seconds)} segs`;

        let label = 'Débil';
        let color = '#e74c3c';
        let percentage = Math.min(100, Math.round((entropy / 128) * 100));

        if (entropy >= 80) {
            label = 'Extrema / Inquebrantable';
            color = '#00ff66';
        } else if (entropy >= 60) {
            label = 'Excelente';
            color = '#2ecc71';
        } else if (entropy >= 45) {
            label = 'Buena';
            color = '#33c5ff';
        } else if (entropy >= 30) {
            label = 'Aceptable';
            color = '#f39c12';
        }

        return { entropy, crackTime, label, color, percentage };
    }

    function updatePhonetics(pass) {
        if (!pass) {
            phoneticOutput.innerHTML = '<em>Sin contraseña</em>';
            return;
        }
        const words = [];
        for (let char of pass) {
            const lower = char.toLowerCase();
            if (state.natoMap[lower]) {
                const text = state.natoMap[lower];
                if (char === char.toUpperCase() && /[a-z]/i.test(char)) {
                    words.push(`<strong>${text.toUpperCase()}</strong>`);
                } else {
                    words.push(text);
                }
            } else {
                words.push(`[${char}]`);
            }
        }
        phoneticOutput.innerHTML = words.slice(0, 18).join(' • ') + (words.length > 18 ? '...' : '');
    }

    // --- HISTORY MANAGEMENT ---
    function addToHistory(pass) {
        if (!pass || state.history.includes(pass)) return;
        state.history.unshift(pass);
        if (state.history.length > 10) state.history.pop();
        renderHistory();
        saveHistory();
    }

    function renderHistory() {
        if (state.history.length === 0) {
            historyList.innerHTML = '<li class="empty-history">No hay contraseñas guardadas aún.</li>';
            return;
        }
        historyList.innerHTML = '';
        state.history.forEach((pass) => {
            const li = document.createElement('li');
            li.className = 'history-item';
            
            const masked = pass.length > 14 ? pass.substring(0, 4) + '...' + pass.slice(-4) : pass;
            li.innerHTML = `<span class="pass-text">${escapeHtml(masked)}</span> <span class="time-tag">copiar</span>`;
            li.addEventListener('click', () => {
                copyToClipboard(pass);
                showToast('Contraseña del historial copiada!');
            });
            historyList.appendChild(li);
        });
    }

    function saveHistory() {
        try {
            localStorage.setItem('tuxpass_history', JSON.stringify(state.history));
        } catch (e) {}
    }

    function loadHistory() {
        try {
            const saved = localStorage.getItem('tuxpass_history');
            if (saved) {
                state.history = JSON.parse(saved);
                renderHistory();
            }
        } catch (e) {}
    }

    // --- CLIPBOARD & TOAST ---
    function copyToClipboard(text) {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            showToast('Contraseña copiada al portapapeles!');
            playKeyClick();
        }).catch(() => {
            showToast('Error al copiar al portapapeles');
        });
    }

    function showToast(msg) {
        toastMsg.textContent = msg;
        toastNotification.classList.remove('hidden');
        setTimeout(() => {
            toastNotification.classList.add('hidden');
        }, 2200);
    }

    function exportFile(content, fileName, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    }

    // --- EVENT LISTENERS ---
    function setupEventListeners() {
        // Theme selector
        themeSelect.addEventListener('change', (e) => {
            changeTheme(e.target.value);
        });

        // Tab Switcher
        modeBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                modeBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                
                btn.classList.add('active');
                const targetTab = document.getElementById(`tab-${btn.dataset.tab}`);
                if (targetTab) targetTab.classList.add('active');
            });
        });

        // Copy & Generate buttons
        btnCopy.addEventListener('click', () => copyToClipboard(state.currentPassword));
        passwordOutput.addEventListener('click', () => copyToClipboard(state.currentPassword));
        btnGenerate.addEventListener('click', generatePassword);

        // Quick Save to Vault Button
        btnSaveToVaultQuick.addEventListener('click', () => {
            openAccountModal(null);
        });

        // Visibility Toggle
        btnToggleVisibility.addEventListener('click', () => {
            state.visible = !state.visible;
            btnToggleVisibility.innerHTML = state.visible ? '<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-eye-slash"></i>';
            updateUI();
        });

        // Audio Toggle
        btnAudioToggle.addEventListener('click', () => {
            state.audioEnabled = !state.audioEnabled;
            btnAudioToggle.classList.toggle('active', state.audioEnabled);
            showToast(state.audioEnabled ? 'Efectos de sonido activados' : 'Sonido desactivado');
        });

        // Vault Toolbar Listeners
        vaultSearchInput.addEventListener('input', renderVaultTable);
        vaultCategoryFilter.addEventListener('change', renderVaultTable);
        btnAddNewAccount.addEventListener('click', () => openAccountModal(null));
        btnLockVault.addEventListener('click', lockVault);

        // Vault Export & Import
        btnExportVault.addEventListener('click', () => {
            const rawPayload = localStorage.getItem('tuxpass_encrypted_vault');
            if (!rawPayload) return showToast('No hay bóveda para exportar');
            exportFile(rawPayload, 'tuxpass_backup_' + Date.now() + '.tuxvault', 'application/json');
            showToast('¡Respaldo encriptado exportado!');
        });

        btnImportVault.addEventListener('click', () => vaultFileInput.click());
        vaultFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (evt) => {
                try {
                    const content = evt.target.result;
                    JSON.parse(content); // Test JSON
                    localStorage.setItem('tuxpass_encrypted_vault', content);
                    showToast('Respaldo cargado. Ingresa tu Contraseña Maestra para abrirlo.');
                    lockVault();
                } catch (err) {
                    showToast('Archivo de respaldo no válido');
                }
            };
            reader.readAsText(file);
        });

        // Account Modal Listeners
        btnCloseAccountModal.addEventListener('click', closeAccountModal);
        btnCancelAccountModal.addEventListener('click', closeAccountModal);
        accountForm.addEventListener('submit', handleAccountFormSubmit);
        btnFillGeneratedPass.addEventListener('click', () => {
            accPassword.value = state.currentPassword;
            showToast('Contraseña cargada en el formulario');
        });

        // Master Unlock Listeners
        btnUnlockVault.addEventListener('click', handleMasterUnlock);
        masterPassInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleMasterUnlock();
        });

        // Slider inputs
        lengthSlider.addEventListener('input', (e) => {
            lengthVal.textContent = e.target.value;
            generatePassword();
        });

        wordCountSlider.addEventListener('input', (e) => {
            wordCountVal.textContent = e.target.value;
            generatePassword();
        });

        // Quick Preset Chips
        document.querySelectorAll('.btn-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const len = chip.dataset.length;
                lengthSlider.value = len;
                lengthVal.textContent = len;
                generatePassword();
            });
        });

        // Checkboxes & inputs change
        [chkUpper, chkLower, chkNumbers, chkSymbols, chkAmbiguous, chkStrict, customSymbols, passphraseSeparator].forEach(el => {
            el.addEventListener('change', generatePassword);
        });

        document.querySelectorAll('input[name="genType"]').forEach(radio => {
            radio.addEventListener('change', () => {
                toggleGenTypePanel();
                generatePassword();
            });
        });

        // History Clear
        btnClearHistory.addEventListener('click', () => {
            state.history = [];
            renderHistory();
            saveHistory();
            showToast('Historial limpiado');
        });
    }

    function toggleGenTypePanel() {
        const val = document.querySelector('input[name="genType"]:checked').value;
        if (val === 'passphrase') {
            passphraseOptions.classList.add('active');
        } else {
            passphraseOptions.classList.remove('active');
        }
    }

    function changeTheme(themeClass) {
        document.body.className = themeClass;
        state.theme = themeClass;
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // Launch App
    init();
});
