document.addEventListener('DOMContentLoaded', () => {
  const landingPage = document.getElementById('landing-page');
  const cardGrid = document.getElementById('card-grid');
  const arUi = document.getElementById('ar-ui');
  const arContainer = document.getElementById('ar-container');
  const backBtn = document.getElementById('back-btn');

  const dinoTitle = document.getElementById('dino-title');
  const dinoStats = document.getElementById('dino-stats');
  const dinoDesc = document.getElementById('dino-desc');

  // Database 30 Dinosaurus
  const dinoData = {
    "tyrannosaurus-rex": { name: "Tyrannosaurus Rex", stats: "Karnivora | Kapur Akhir", desc: "Predator puncak dengan kekuatan gigitan paling mematikan dalam sejarah." },
    "triceratops": { name: "Triceratops", stats: "Herbivora | Kapur Akhir", desc: "Memiliki 3 tanduk besar dan perisai tulang leher pelindung." },
    "velociraptor": { name: "Velociraptor", stats: "Karnivora | Kapur Akhir", desc: "Predator lincah dan cerdas yang berburu secara berkelompok." },
    "spinosaurus": { name: "Spinosaurus", stats: "Karnivora | Kapur Tengah", desc: "Predator semi-akuatik raksasa dengan sirip layar di punggungnya." },
    "stegosaurus": { name: "Stegosaurus", stats: "Herbivora | Jura Akhir", desc: "Memiliki lempeng tulang berturut-turut di sepanjang punggungnya." },
    "brachiosaurus": { name: "Brachiosaurus", stats: "Herbivora | Jura Akhir", desc: "Sauropoda leher panjang raksasa pemakan pucuk pohon." },
    "ankylosaurus": { name: "Ankylosaurus", stats: "Herbivora | Kapur Akhir", desc: "Dilindungi oleh zirah tebal dan gada tulang kuat di ekornya." },
    "megalosaurus": { name: "Megalosaurus", stats: "Karnivora | Jura Tengah", desc: "Dinosaurus pertama yang diberi nama ilmiah resmi." },
    "ceratosaurus": { name: "Ceratosaurus", stats: "Karnivora | Jura Akhir", desc: "Memiliki tanduk khas di atas hidungnya." },
    "deinonychus": { name: "Deinonychus", stats: "Karnivora | Kapur Awal", desc: "Terkenal dengan cakar berbentuk sabit raksasa di kakinya." },
    "compsognathus": { name: "Compsognathus", stats: "Karnivora | Jura Akhir", desc: "Dinosaurus kecil seukuran ayam modern." },
    "parasaurolophus": { name: "Parasaurolophus", stats: "Herbivora | Kapur Akhir", desc: "Memiliki mahkota tabung panjang pemancar suara." },
    "pachycephalosaurus": { name: "Pachycephalosaurus", stats: "Herbivora | Kapur Akhir", desc: "Memiliki tempurung kepala tebal untuk menyeruduk musuh." },
    "carcharodontosaurus": { name: "Carcharodontosaurus", stats: "Karnivora | Kapur Tengah", desc: "Predator raksasa dengan gigi bergerigi tajam." },
    "carnotaurus": { name: "Carnotaurus", stats: "Karnivora | Kapur Akhir", desc: "Pelari sangat cepat dengan sepasang tanduk di atas matanya." },
    "albertosaurus": { name: "Albertosaurus", stats: "Karnivora | Kapur Akhir", desc: "Kerabat T-Rex yang lebih lincah dan ramping." },
    "giganotosaurus": { name: "Giganotosaurus", stats: "Karnivora | Kapur Awal", desc: "Dinosaurus pemakan daging raksasa dari Amerika Selatan." },
    "utahraptor": { name: "Utahraptor", stats: "Karnivora | Kapur Awal", desc: "Spesies terbesar dan paling mematikan dari keluarga raptor." },
    "baryonyx": { name: "Baryonyx", stats: "Karnivora | Kapur Awal", desc: "Dinosaurus pemakan ikan dengan cakar besar di jempolnya." },
    "allosaurus": { name: "Allosaurus", stats: "Karnivora | Jura Akhir", desc: "Predator utama yang mendominasi era Jurassik." },
    "iguanodon": { name: "Iguanodon", stats: "Herbivora | Kapur Awal", desc: "Memiliki duri tajam di ibu jarinya untuk pertahanan diri." },
    "maiasaura": { name: "Maiasaura", stats: "Herbivora | Kapur Akhir", desc: "Dinosaurus yang sangat telaten merawat anak-anaknya di sarang." },
    "protoceratops": { name: "Protoceratops", stats: "Herbivora | Kapur Akhir", desc: "Nenek moyang Triceratops yang belum memiliki tanduk panjang." },
    "styracosaurus": { name: "Styracosaurus", stats: "Herbivora | Kapur Akhir", desc: "Memiliki perisai leher bertanduk panjang mengelilinginya." },
    "edmontosaurus": { name: "Edmontosaurus", stats: "Herbivora | Kapur Akhir", desc: "Dinosaurus paruh bebek bertubuh besar." },
    "diplodocus": { name: "Diplodocus", stats: "Herbivora | Jura Akhir", desc: "Memiliki ekor sangat panjang yang dikibaskan seperti cambuk." },
    "apatosaurus": { name: "Apatosaurus", stats: "Herbivora | Jura Akhir", desc: "Sauropoda bertubuh besar, tebal, dan kekar." },
    "argentinosaurus": { name: "Argentinosaurus", stats: "Herbivora | Kapur Tengah", desc: "Salah satu hewan darat terbesar yang pernah berjalan di bumi." },
    "pteranodon": { name: "Pteranodon", stats: "Karnivora | Kapur Akhir", desc: "Reptil terbang raksasa dengan bentang sayap hingga 7 meter." },
    "quetzalcoatlus": { name: "Quetzalcoatlus", stats: "Karnivora | Kapur Akhir", desc: "Hewan terbang terbesar sepanjang masa, setinggi jerapah modern." }
  };

  // 1. Render Card Dinosaurus
  Object.keys(dinoData).forEach(key => {
    const dino = dinoData[key];
    const card = document.createElement('div');
    card.className = 'dino-card';
    card.innerHTML = `
      <h3>${dino.name}</h3>
      <button class="scan-btn">Mulai Scan</button>
    `;
    card.addEventListener('click', () => startAR(key));
    cardGrid.appendChild(card);
  });

  // 2. Fungsi Jalankan AR Scene
  function startAR(dinoKey) {
    const dino = dinoData[dinoKey];

    landingPage.style.display = 'none';
    arUi.style.display = 'block';

    dinoTitle.textContent = dino.name;
    dinoStats.textContent = dino.stats;
    dinoDesc.textContent = "Sedang menyiapkan kamera... Arahkan ke gambar " + dino.name + ".";

    // Path NFT relatif yang aman
    const nftPath = `assets/nft/${dinoKey}`;

    // Buat elemen scene AR secara bersih tanpa pemanggilan getUserMedia ganda
    arContainer.innerHTML = `
      <a-scene
        embedded
        vr-mode-ui="enabled: false"
        renderer="logarithmicDepthBuffer: true; alpha: true;"
        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;">

        <a-assets>
          <audio id="audio-dino" src="assets/audio/${dinoKey}.mp3" preload="auto"></audio>
          <a-asset-item id="model-dino" src="assets/models/${dinoKey}.glb"></a-asset-item>
        </a-assets>

        <a-nft id="active-marker" type="nft" url="${nftPath}" smooth="true" smoothCount="10" smoothTolerance="0.01" smoothThreshold="5">
          <a-entity gltf-model="#model-dino" scale="1 1 1" position="0 0 0"></a-entity>
        </a-nft>

        <a-entity camera></a-entity>
      </a-scene>
      <div id="ar-loading">Memuat Kamera & Data AR...</div>
    `;

    // Event Listener Marker & Audio
    setTimeout(() => {
      const markerEl = document.getElementById('active-marker');
      const audioEl = document.getElementById('audio-dino');

      if (markerEl) {
        markerEl.addEventListener('markerFound', () => {
          const loadingEl = document.getElementById('ar-loading');
          if (loadingEl) loadingEl.style.display = 'none';
          dinoDesc.textContent = dino.desc;
          if (audioEl) {
            audioEl.currentTime = 0;
            audioEl.play().catch(e => console.log('Autoplay audio diproteksi browser:', e));
          }
        });

        markerEl.addEventListener('markerLost', () => {
          dinoDesc.textContent = "Arahkan kembali kamera ke gambar " + dino.name;
          if (audioEl) {
            audioEl.pause();
          }
        });
      }
    }, 1200);
  }

  // 3. Tombol Kembali
  backBtn.addEventListener('click', () => {
    arContainer.innerHTML = '';
    arUi.style.display = 'none';
    landingPage.style.display = 'flex';
    // Reload halaman untuk membersihkan memori GPU & Stream Kamera HP
    window.location.reload();
  });
});