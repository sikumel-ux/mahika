import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = { 
    apiKey: "AIzaSyAmTAWHcHpolaIHegLceyMqExVgzufJzaU", 
    authDomain: "mahika-trans.firebaseapp.com", 
    projectId: "mahika-trans", 
    appId: "1:1087881066133:web:148d51c88f1de3466ecd9c" 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fungsi Toggle Profile (Global agar bisa dipanggil onclick)
window.toggleProfile = function() {
    const panel = document.getElementById('company-profile');
    if(panel.classList.contains('translate-y-full')) {
        panel.classList.remove('translate-y-full');
        panel.classList.add('translate-y-0');
        document.body.style.overflow = 'hidden'; // Kunci scroll body
    } else {
        panel.classList.add('translate-y-full');
        panel.classList.remove('translate-y-0');
        document.body.style.overflow = 'auto'; // Aktifkan scroll body
    }
};

// Auto Slide Info Fade
let currentInfo = 0;
const infoItems = document.querySelectorAll('.info-fade');
setInterval(() => {
    if(infoItems.length) {
        infoItems[currentInfo].classList.remove('active');
        currentInfo = (currentInfo + 1) % infoItems.length;
        infoItems[currentInfo].classList.add('active');
    }
}, 4000);

// Logika Pencarian
document.getElementById('btnSearch').onclick = async function() {
    const keyword = document.getElementById('search-input').value.trim().toLowerCase();
    if(!keyword) return;

    const busList = document.getElementById('bus-list');
    const container = document.getElementById('result-container');
    const welcome = document.getElementById('welcome-card');

    welcome.classList.add('hidden');
    container.classList.remove('hidden');
    busList.innerHTML = `<p class="text-center text-sky-400 animate-pulse text-[10px] py-10">MENCARI RUTE...</p>`;

    try {
        const q = collection(db, "direktori_rute");
        const snap = await getDocs(q);
        let html = "";
        
        snap.forEach(doc => {
            const b = doc.data();
            if(b.tujuan?.toLowerCase().includes(keyword)) {
                html += `
                <div class="glass p-6 rounded-[30px] flex justify-between items-center border-l-4 border-sky-400 shadow-lg">
                    <div>
                        <h3 class="font-black text-white uppercase text-sm">${b.armada}</h3>
                        <p class="text-[9px] font-bold text-sky-400 uppercase tracking-widest">${keyword}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-xl font-black text-white">${b.jam}</p>
                        <p class="text-[8px] font-bold text-sky-400">WIB</p>
                    </div>
                </div>`;
            }
        });
        busList.innerHTML = html || `<div class="glass p-10 rounded-3xl text-center"><p class="text-xs opacity-30 uppercase">Rute tidak ditemukan</p></div>`;
    } catch (e) { console.error(e); }
};
