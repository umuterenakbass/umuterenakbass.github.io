## Umut Eren Akbaş — Portfolio

Kişisel portfolyo sitesi: hızlı, sade, mobil uyumlu. Light/Dark tema ve TR/EN dil desteği ile projeler, görseller ve küçük metrik grafikleri.

### Öne çıkanlar
- Light/Dark tema (kalıcı seçim)
- Dil seçici (TR/EN)
- Bölümler: Hakkımda, Yetenekler, Projeler, İletişim
- Proje kartları + modal: açıklama, etiketler, çoklu görsel, kaynak/demo linkleri
- Metrikler için Chart.js bar grafiği

### Yerel Çalıştırma (opsiyonel)
```bash
python3 -m http.server 5173
# ardından tarayıcıda: http://localhost:5173
```
HTTP ile çalışırken veriler `data/projects.json` dosyasından; dosya olarak açıldığında `index.html` içindeki inline JSON’dan yüklenir.

### İçerik Düzenleme
- Projeler: `data/projects.json` (TR/EN alanları), veya hızlı deneme için `index.html` içindeki `script#project-data` bloğu
- Stil: `css/style.css`
- Davranışlar: `js/main.js`

### Yayınlama (GitHub Pages)
Bu depo `umuterenakbass/umuterenakbass.github.io` olarak ana branşa (main) push edildiğinde otomatik yayınlanır: https://umuterenakbass.github.io

Serbestçe kullanıp düzenleyebilirsiniz.
