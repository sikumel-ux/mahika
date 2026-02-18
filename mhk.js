import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = { 
    apiKey: "AIzaSyAmTAWHcHpolaIHegLceyMqExVgzufJzaU", 
    authDomain: "mahika-trans.firebaseapp.com", 
    projectId: "mahika-trans", 
    storageBucket: "mahika-trans.firebasestorage.app", 
    appId: "1:1087881066133:web:148d51c88f1de3466ecd9c" 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DAFTARKAN FUNGSI KE WINDOW BIAR BISA DIPANGGIL ONCLICK
window.toggleProfile = function() {
    const panel = document.getElementById('company-profile');
    if (!panel) return;
    const isOpen = panel.style.transform === 'translateY(0px)';
    panel.style.transform = isOpen ? 'translateY(100%)' : 'translateY(0px)';
};

// Start Animation Loops
const startLoops = () => {
    let currentTesti = 0;
    const testitems = document.querySelectorAll('.testi-item');
    if(testitems.length) {
        setInterval(() => {
            testitems[currentTesti].classList.remove('active');
            currentTesti = (currentTesti + 1) % testitems.length;
            testitems[currentTesti].classList.add('active');
        }, 5000);
    }

    let currentInfo = 0;
    const infoItems = document.querySelectorAll('.info-fade');
    if(infoItems.length) {
        setInterval(() => {
            infoItems[currentInfo].classList.remove('active');
            currentInfo = (currentInfo + 1) % infoItems.length;
            infoItems[currentInfo].classList.add('active');
        }, 4000);
    }
};
startLoops();

// Search Action
document.getElementById('btnSearch').onclick = async function() {
    const keyword = document.getElementById('search-input').value.trim().toLowerCase();
    if(!keyword) return;

    const busList = document.getElementById('bus-list');
    const container = document.getElementById('result-container');
    const welcome = document.getElementById('welcome-card');
    const marquee = document.getElementById('marquee-section');

    welcome.classList.add('hidden');
    marquee.classList.add('hidden'); 
    container.classList.remove('hidden');
    busList.innerHTML = `<p class="text-center text-sky-400 animate-pulse text-[9px] uppercase font-black py-10">Mencari Rute...</p>`;

    try {
        const q = collection(db, "direktori_rute");
        const snap = await getDocs(q);
        let html = "";
        
        snap.forEach(doc => {
            const b = doc.data();
            const ruteStr = b.tujuan ? b.tujuan.toLowerCase() : "";
            if(ruteStr.includes(keyword)) {
                html += `
                <div class="glass p-6 rounded-[35px] flex justify-between items-center mb-4 border-l-4 border-sky-400 shadow-xl animate-fade-in">
                    <div>
                        <h3 class="font-black text-white uppercase tracking-tight">${b.armada}</h3>
                        <p class="text-[9px] font-bold text-sky-400 uppercase tracking-widest">${keyword.toUpperCase()}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-2xl font-black text-white tracking-tighter">${b.jam}</p>
                        <p class="text-[8px] font-bold text-sky-400">WIB</p>
                    </div>
                </div>`;
            }
        });
        busList.innerHTML = html || `<div class="glass p-10 rounded-3xl text-center"><p class="text-xs opacity-30 uppercase font-bold">Rute tidak tersedia</p></div>`;
    } catch (e) { console.error(e); }
};
