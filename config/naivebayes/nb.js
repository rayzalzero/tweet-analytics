//'use strict'
//const stemmer = require('./porter/porter');
const stopword = require('./porter/porter_id');

var wordInDoc = {positif:{},negatif:{}};
var sumDocs = 0;
var sumAllDocs = {};
var docsByClass = {};
var wd = 'wd';
var word;
let vocab = {
	positif: {
		wd: ['a+','acungan jempol','adaptif','adil','afinitas','afirmasi','agilely','agung','ahli','ahlinya','ajaib','aklamasi',
			'akomodatif','akurat','alam mimpi','alhamdulillah','allahu akbar','altruistis','allah','aman','amanah','amat','ambisius','andal',
			'aneh','anggun','angin sepoi-sepoi','angkat','antusias','antusiasme','apik','apresiasi','asli','aspirasi','asyik','bagos',
			'bagus','bahagia','baik','baik diposisikan','baik sekali','baik-baik','bakat','bangga','bantuan','banyak','banyak akal',
			'barang baru','batu permata','bebas','bebas masalah','bebas pulsa','bebas rasa sakit','bebas resiko','bekerja',
			'bekerja keras','belas kasihan','benar','benar-benar','bengal','beradaptasi','beralasan','berani','berapi','berarti',
			'berbaik hati','berbakat','berbesar hati','berbudi luhur','bercacat','bercahaya','bercanda','bercita-cita','berdaya cipta',
			'berdebar','berdedikasi','berdikari','berempati','bergairah','bergaya','bergema','bergembira','bergembira sekali',
			'bergengsi','bergizi','berguna','berharga','berhasil','berhutang','berikut','berimbang','berisi','beristirahat',
			'berjanji','berjasa','berjaya','berjenis','berjuang','berkapasitas besar','berkat','berkeinginan','berkelakuan baik',
			'berkelanjutan','berkembang','berkeyakinan','berkilau','berkilauan','berkualitas','berlangsung mudah','berlimpah',
			'berlimpah-limpah','bermaksud baik','bermanfaat','bermanuver','bermartabat','bernilai','berpendidikan','berpendidikan baik',
			'berpengalaman','berpengaruh','berpengetahuan luas','berpijar','bersatu','bersedia melakukan','bersemangat',
			'bersemangat meluap-luap','bersenang-senang','bersenda gurau','berseri','bersifat dermawan','bersifat mendamaikan',
			'bersih','bersinar','bersorak','bersubsidi','bersuka cita','bersuka ria','bersyukur','bertanggung jawab','bertekun',
			'berterimakasih','beruntung','berwarna ria','berwawasan','besar','besar sekali','biaya rendah','bijak','bijaksana',
			'bikin cemburu','bimbingan','bintang rock','bisa digunakan','bisa diterapkan','bonus','boros','brilian','cahaya',
			'cahaya redup','cakap','cantik','cashbacks','cekatan','cemas','cemerlang','cepat','cerah','cerdas','cerdik','cergas',
			'cermat','cetar','cetar membahana','cinta','cocok','contoh','cukup','cukup besar','cukuplah','damai','dapat diandalkan',
			'dapat dicapai','dapat diganti','dapat dipercaya','dapat diraih','dapat disesuaikan','daya tarik','dengan mewah',
			'dengan senang hati','dengan sopan','dermawan','dewasa','diakses','diakui','diam','dianggap baik','dibaca','dibebaskan',
			'diberikan','dibersihkan','dibuat dengan baik','dicapai','didominasi','didukung','diganggu gugat','diganti oleh pengguna',
			'digunakan','dihargai','diinginkan','diizinkan','dikelola','dikelola dengan baik','dikembalikan','dilayari','dilengkapi',
			'dilepas','dilihat','dimenangkan','dimengerti','dinamis','diperbaharui','dipercaya','diperoleh','diplomatik','dipoles',
			'direformasi','direkomendasikan','diremajakan','direstrukturisasi','disahkan','disayangi','disederhanakan','disubsidi',
			'ditambah lagi','ditegakkan','diterima dengan baik','ditingkatkan','diverifikasi','dorongan','duanya','Dukung','dukungan',
			'durian runtuh','edukatif','efektif','efektivitas','efisien','egois','ekonomis','ekstase','elastis','elegan','elite',
			'emas','empati','enak','enchantingly','energi','ergonomis','etis','euforia','evaluatif','examplar','fajar','fantastis',
			'fasih','fav','fave','favorit','fenomenal','firdaus','fleksibel','fleksibilitas','fakta','futuristik','gagah','gaib','gainfully',
			'gairah','gamblang','gembira','gembira luar biasa','gembira sekali','gemuk','gesit','giat','gigih','gokil','gratis',
			'gurih','habis','hadiah','hak istimewa','halal','halus','handal','handier','hangat','harga diri','harga rendah','harmoni',
			'harmonis','harta','harum','hasil karya','hasil terbaik','hati','hati-hati','hebat','hemat','hemat biaya','hemat energi',
			'heran','heroik','hore','horee','hormat','hubungan','hujan es','iba','ideal','idealnya','idola','ikhwan','ilahi','ilu',
			'imajinatif','iman','imut','indah','individual','infalibilitas','inovasi','inovatif','inspirasi','inspirasional',
			'inspiratif','instrumental','integral','intelijen','intim','intrik','intuitif','irama','iri','istimewa','isyarat',
			'jaminan','jaminan mutu','janji','jawa','jelas','jempol','jempolan','jenaka','jenius','juara','jujur','kagum','kanan',
			'karisma','karismatik','karya','kasih sayang','kaya','kaya fitur','keadaan yg sebenarnya','keadilan','keagungan',
			'keajaiban','keanggunan','keangkeran','keaslian','kebahagiaan','kebaikan','kebajikan','kebal','kebanggaan','kebangkitan',
			'kebaruan','kebebasan','kebenaran','keberanian','keberhasilan','keberlanjutan','kebersamaan','kebersihan','keberuntungan',
			'kebesaran','kebetulan','kebijaksanaan','kecakapan','kecantikan','kecemerlangan','kecepatan','kecerdasan','kecerdikan',
			'keemasan','keenakan','kegairahan','kegembiraan','kegembiraan yg meluap-luap','kehangatan','keheranan','keindahan','keinginan',
			'keintiman','kejayaan','kejelasan','kejujuran','kekaguman','kekal','kekalahan','kekasih','kekencangan','kelancaran berbicara',
			'kelangsungan hidup','kelas atas','kelas satu','kelas utama','kelayakan','kelezatan','kelimpahan','kelincahan','kelip redup',
			'kelucuan','keluwesan','kemajuan','kemakmuran','kemampuan','kemantapan','kemasyhuran','kematangan','kemauan baik','kemegahan',
			'kemenangan','kemewahan','kemudahan','kemurahan hati','kenangan','kenikmatan','kenyamanan','kepanjangan akal daya',
			'kepentingan','kepercayaan','keperkasaan','kepincut','kepuasan','kepuasan diri','keramahan','keramat','keranjingan',
			'kerelaan','keren','kerendahan hati','keriangan','keriuhan di pawai','kerubin','kesabaran','kesalehan','kesatuan',
			'kesayangan','kesehatan','kesejahteraan','kesembronoan','kesempurnaan','kesenangan','kesetiaan','kesopanan','kestabilan',
			'kesucian','kesukaan','kesungguhan','ketabahan','ketajaman','ketegasan','keteguhan','ketekunan','ketenangan','ketenaran',
			'keterbukaan','ketercocokan','ketidakberpihakan','ketrampilan','ketulusan','keuletan','keunggulan','keuntungan','kewaspadaan',
			'khusus','kilau','klasik','koheren','koherensi','komitmen','kompak','kompetitif','komplementer','konsisten','konstruktif',
			'kontinuitas','kontras','kontribusi','kooperatif','koperasi','korek api','kreatif','Kualitas terbaik','kualitas tinggi',
			'kuasa','kuat','kue panas','kukuh','kurus','lagu','lancar','landasan','lapang','laudably','layak','lebih baik',
			'lebih baik dari perkiraan','lebih cemerlang dari','lebih cepat','lebih dikenal','lebih disukai','lebih hangat',
			'lebih kencang','lebih keras','Lebih memilih','lebih memilih','lebih murah','lebih suka','lebih tenang','ledakan',
			'legendaris','lemah lembut','lembut','lezat','licin','lincah','liris','logis','loyalitas','luar biasa','luas','lucu',
			'lumayan','luwes','maaf','mahal','mahir','main-main','maju','makanan','makmur','malaikat','mampu','manfaat','manis',
			'manis sekali','manja','manjur','mantab','manusiawi','mapan','martabat','master','masuk akal','matang','mati-matian',
			'mau kalah','mawas','megah','mekar','melampaui','melebihi','melengkapi','melindungi','meluruskan','memadai','memanggil',
			'memantapkan','memastikan','membandingi keindahan puisi','membantu','membara','membayar','membebaskan','memberanikan',
			'memberdayakan','memberkati','membesarkan hati','membesut','membiasakan','membuat lebih baik dr','membudayakan','membujuk',
			'membuktikan','memelihara','memeluk','memenuhi','memenuhi syarat','memeriahkan','memfavoritkan','memihak','memikat',
			'memikat hati','memimpin','memperbaiki','memperbaiki akhlak','mempercantik','mempercayakan','memperjelas','memperkaya',
			'memperkuat','mempermanis','memperoleh kembali','mempesona','memuaskan','memudahkan','memuja','memujanya','memuji',
			'memuji-muji','memuji-muji terlebih-lebihan','memukau','memuliakan','memulihkan','memurnikan','menakjubkan','menambah',
			'menang','menantang','menarik','menariknya','menawan','mencengangkan','mencintai','mencukupi','mendalam','mendamaikan',
			'mendapatkan','mendebarkan','mendewakan','mendominasi','mendorong','mendukung','menebus','menegakkan','menegaskan',
			'menegaskan lagi','menenangkan','menentukan','menerangi','menerangkan','menerima','menerobos','mengagetkan','mengagumi',
			'mengagumkan','mengagungkan','mengakali','mengalahkan','menganggap','mengangkat','menganjurkan','mengasyikan','mengasyikkan',
			'mengatasi','mengecoh','mengejutkan','mengerti','mengesahkan','mengesankan','menggairahkan','menggelenyar','menggelikan',
			'menggelitik','menggembirakan','menggemparkan','menggetarkan','menggiurkan','menggoda','menggugah','menghadiahkan',
			'menghaluskan','menghargai','mengharukan','mengherankan','menghibur','menghidupkan','menghormat','menghormati','mengidealkan',
			'mengidolakan','mengilhami','menginginkan','mengisyaratkan','menguasai','mengucapkan selamat','mengundang','mengungguli',
			'menguntungkan','menikmati','menimbulkan perasaan cinta','menimbulkan rasa antusias','meninggikan','meningkat',
			'meningkatkan','menitipkan','menjamin','menjanjikan','menonjol','mentereng','menunjukkan gejala','menurut hak','menyalip',
			'menyambut','menyanjung','menyaring','menyederhanakan','menyegarkan','menyelaraskan','menyelesaikan','menyembuhkan',
			'menyenangkan','menyerahkan','menyeringai','menyetujui','menyolok','menyubsidi','menyukai','menyusul','merangsang',
			'merayakan','merayu','mereda','mereformasi','merekomendasikan','merelakan','meremajakan','merendahkan','merenung',
			'merevitalisasi','merevolusi','merevolusionerkan','meriangkan','meringankan','meromantiskan','mewah','meyakinkan',
			'minim resiko','modern','modis','montok','monumental','moralitas','muda','mudah','mudah digunakan','mujarab','mukjizat',
			'mulia','mulus','murah','murah banget','murah hati','murni','mutakhir','nonton','nasib','nikmat','non-kekerasan','nyaman','nyaring',
			'obat untuk segala penyakit','obsesi','optimal','optimis','optimisme','otoriter','padat','pahlawan','pahlawan wanita',
			'paling beruntung','paling dikenal','panas','pandai berbicara','panorama','pantas','pasien','pasti',
			'pasukan penjaga perdamaian','patriot','patriotik','patuh','pedih','peka','pelamun','pelindung','pelonggaran',
			'pembaruan','pembebasan','pembela','pemberdayaan','pemberian Tuhan','pembersih','pembetulan','pemecah masalah',
			'pemenang','pemenuhan','pemulihan','penampilan terbaik','pencerahan','pencinta','pendewaan','pendukung','penebusan',
			'penegasan kembali','penentuan nasib sendiri','penerima','pengagum','pengampunan','pengangkatan','pengaruh','pengasih',
			'pengasuhan','pengembalian dana','penggemar','penghargaan','Penghargaan','penghemat','penghematan','penghematan biaya',
			'penghiburan','penghormatan','penguasaan','peninggian derajat','peningkatan','penipu','penjualan terbaik','penolong',
			'penting','penuh','penuh gaya','penuh harapan','penuh kasih','penuh kebahagiaan','penuh kebajikan','penuh kegembiraan',
			'penuh kepercayaan','penuh pengharapan','penebar','penuh perasaan','penuh perhatian','penuh peristiwa','penuh semangat','penuh sukacita',
			'penyayang','penyelamat','penyuburan','perasaan kagum','perasaan suka cita','perayaan','perbaikan','perbedaan',
			'perdamaian','perdana menteri','perhatian','periang','perjanjian','perlawanan','perlindungan','permai','permata',
			'persahabatan','persetujuan','persik','personalisasi','pertama di kelas','pertumbuhan tercepat','pesona','petualang',
			'piala','pikiran-bertiup','pilihan','pintar','Plus','populer','portabel','positif','preferensi','prestasi','pro',
			'proaktif','prodigi','produktif','progresif','promotor','puas','puitis','pujian','pukulan yg tdk keras','pulih','puncak',
			'rahmat','rajin','rak','ramah','ramah tamah','rangsang','rapi','rasa hormat','rasa manis','rasional','rata',
			'realisasi','realistis','reformasi','rekomendasi','rela','reputasi','reseptif','resiko rendah','responsif','restrukturisasi',
			'revolusioner','ria gembira','riang','ringan','ringkas','rohani','rokstar','romantis','rujuk','rumit','sabar',
			'sah','saleh','salut','sangat','sangat baik','sangat berharga','silaturahim','sangat indah','sangat memuaskan','sangat menarik',
			'sangat menyayangi','sangat mudah','sangat penting','sangat rajin','sangat sopan','sangat tepat','sanjungan','sarankan',
			'sayang','sayang anak','secara kuat','secara menyenangkan','secara terbuka','secepatnya','sederhana','segar','segera',
			'sehat','sahur','seimbang','seksi','Selamat','selamat','selayaknya','selektif','semakin lembut','semakin makmur','semangat',
			'sempurna','semuanya','senang','sengaja','sensasi','sensasional','senyum','sepanjang masa','sepantasnya','sepatutnya',
			'sepele','sepenuh hati','seperti','seperti malaikat','seperti patung','seperti raja','serangan balik','serba cepat',
			'serba guna','sesak napas','sesuai','sesuai dengan mode terakhir','sesungguhnya','setajam silet','setia','setuju',
			'sewajarnya','sewenang-wenang','siap','sigap','sihir','sikap tenang','silakan','silau','simpatisan','sok aksi','solidaritas',
			'sopan','sorak kegirangan','sosial','spektakuler','spontan','sporty','stabil','stabilitas','sub','subhanallah','subsidi',
			'substantif','subur','suci','sukacita','sukses','sulit','sungguh','sungguh-sungguh','super','supremasi','surealis','surga',
			'surgawi','swasembada','swatantra','syukur','taat','taat hukum','tabah','tabungan','tahan karat','tahan lama','tajam',
			'tak ada salahnya','tak ada taranya','tak berbahaya','tak bercacat','tak bersuara','tak bersyarat','tak dapat disangsikan',
			'tak diragukan lagi','tak disengaja','tak kenal takut','tak perlu dipersoalkan','tak tahu malu','tak terbantahkan',
			'tak terbatas','tak tergantikan','tak terhitung','tak terkalahkan','tak terkendalikan','tak terlupakan','tak ternilai',
			'tak terpadai','tak tertahankan','takdir','takjub','takzim','tampak','tampan','tanda','tangan ke bawah','tangkas',
			'tanpa cela','tanpa dosa','tanpa malu-malu','tanpa rasa sakit','tanpa rasa takut','tanpa tenaga','tawar','tawaran',
			'tdk berbahaya','tegas','teguh','teladan','teliti','temanmu','tenang','tepat','tepat pada waktunya','tepat waktu',
			'tepuk tangan sorak','terampil','terang','terang benderang','teranyar','terbaik','terbaru','terbatas','terbebani',
			'terberat','terbersih','terbesar','terbukti','tercapai','tercengang','tercepat','tercinta','terdengar','terdepan',
			'terelakkan','tergantikan','terhormat','terima','terima kasih','terjamin','terjangkau','terkalahkan','terkejar','terkejut',
			'terkekang','terkemuka','terkenal','terkenal di dunia','terkuat','terlalu memanjakan','termotivasi','termudah',
			'termurah','terobosan','terompet','terpadu','terpanas','terpelajar','terpengaruh','terpenting','terpercaya','terpesona',
			'terpuji','terrifically','tersayang','tersedia','tersenyum','tertarik','tertib','tertinggi','terus terang','terutama',
			'tetap','tiada bandingan','tiada duanya','tidak egois','tidak ternilai','tipis','tokoh','TOP','trendi','tulang punggung',
			'tulus','tumbuh cepat','tunggu dulu','uang kembali','ulung','unggul','unggulan','unik','untung','untungnya','utuh',
			'uye','letiasi','visioner','wah','wahyu','warna-warni','waspada','whooa','Whooooa','Wow','WOW','yakin','yay','yeah','yihaa',
			'umat']
	},
	negatif: {
		wd: ['abnormal','absurd','acak','acak-acakan','acuh','acuh tak acuh','adiktif','adil','agresi','agresif','agresor',
			'aib','air terjun','akurat','alarm','alasan','alat permainan','alergi','alergik','amat ketakutan','amat panas','ambigu',
			'ambivalen','ambivalensi','amoral','amoralitas','ampun','amuk','anak nakal','anak yatim','anarki','anarkis','anarkisme',
			'ancaman','aneh','aneh lagi','anehnya','angkuh','angriness','anjing','anjlok','anomali','antagonis','antagonisme','antek',
			'anti-','anti-Amerika','anti-Israel','anti-kita','anti-pendudukan','anti-proliferasi','anti-putih','anti-Semit','antipati',
			'antisosial','antitesis','apak','apati','apatis','apek','apokaliptik','apologis','argumentatif','artinya jika','asam','asap',
			'asem','asing','astaghfirullah','asusila','awan','awas','asu','babi','badai','bahan tertawaan','bahaya','bajingan','baju kotor',
			'balas dendam','bandel','bandot','bangke','bangkrut','bantingan','banyak sekali','barang ganjil','barbar','basi','bau','bawahan',
			'bebal','beban','bejat','bekas','bekas luka','bekas roda','beku','belah','belum dewasa','belum dicoba','belum dikonfirmasi',
			'belum pasti','belum selesai','benar-benar','bencana','bencana alam','benci','bengah','bengis','bengkak','bengkeng','bengkok',
			'benjolan','bentrokan','beracun','beradab','berakhir','berang','berani','berantakan','berat','berat sebelah','berawan',
			'berbahaya','berbatu-batu','berbau','berbeda','berbisa','berbohong','berbuat curang','berbuat jahat','berbuat salah','berbuih',
			'bercacat','berdalih','berdarah','berdasar','berdaya','berdebar','berdebat','berdebu','berdengung','berdenyut',
			'berdenyut-denyut','berderak','berderit','berdetak','berdokumen','berdosa','berduka','berduri','berdusta','berebut',
			'bergairah','bergegas','bergelombang','bergeming','bergerak','bergerak lambat','bergerigi','bergetar','bergolak','bergulat',
			'berhaluan kiri','berisiko','berita palsu','berjangkit','berjuang','berkarat','berkata tanpa berpikir','berkedip',
			'berkejut','berkenan','berkeping-keping','berkeras pendirian','berkeringat','berkerut','berkhayal','berkilat','berkilau',
			'berkolusi','berkonflik','berkubang','berkurang','berlangganan','berlebihan','berlemak','berlengah-lengah','berlepotan',
			'berliku-liku','berlumpur','bermain berlebih-lebihan','bermasalah','berminyak','bermoral','bermuka dua','bermuram',
			'bermuram durja','bermusuhan','bermutu rendah','bernasib buruk','bernoda kotor','berongga','berperang','berpura-pura',
			'berputus asa','bersaing','bersakit','bersanding','bersedih','bersekongkol','berselang','berselisih','bersemangat',
			'bersenandung','berserakan','bersetubuh','bersisik','bertele-tele','bertemu','bertengkar','bertentangan','berteriak',
			'bertindak tidak pantas','bertingkah','bertubuh kecil','berukuran terlalu kecil','berumur pendek','berwajah dua','biadab',
			'bias','biasa','biasa-biasa saja','bidah','bikinan','bimbang','binasa','bingung','Bingung','bisa ular','bising','blunder',
			'bobrok','bocor','bodoh','bohong','bom','boneka','boros','bosan','botak','brutal','bual','buar','buas','budak','bug',
			'bukan kepalang','buntu','bunuh diri','buram','buritan','buronan','buruk','buruk sekali','busuk','buta','buta huruf',
			'cabul','cacat','cacian','caci','calo','cambuk','canggung','cara','cari perkara','carut-marut','cebol','cedera','cekcok',
			'cekung','celaan','celah','celaka','cemas','cemberut','cemburu','cemooh','cemoohan','cenderung','cengeng','cengking',
			'cercaan','cerdik','cerewet','ceroboh','compang-camping','corengan','cukup','curam','curang','curiga','dancok','dangkal',
			'deadline','debu','defensif','degenerasi','degradasi','dehumanisasi','delusi','demam','demoralisasi','dendam',
			'dengan mencemoohkan','dengan mendapat malapetaka','dengan mengagetkan','dengan menghina','dengan menyedihkan',
			'dengan menyesal','dengan panas','dengan penuh ketakutan','dengan rasa curiga','dengan rasa hina','dengan remeh-temeh',
			'dengan sedih','dengan segan','dengan sengit','dengan sia-sia','dengan suara keras','dengan sukar','dengan terbahak-bahak',
			'dengan tidak senang','dengki','depresi','derita','desis','destruktif','diam','diam-diam','dibakar','dibanjiri','dibantai',
			'dibenarkan','dibenci','dibesar-besarkan','dibuang','dibuat-buat','dicela','dicerca','dicuci','dicuri','didanai','diganggu',
			'dihaluskan','dihentikan','dihibur','dihukum','dijauhi','dijelaskan','dikaburkan','dikenakan','dikorbankan','diktator',
			'diktatoris','dilapisi gula','dilecehkan','dilema','dilenyapkan','dimaafkan','dimarahi','dimengerti','dingin','diperangi',
			'diperkosa','diperlakukan dengan buruk','dipermainkan','dipertanyakan','dipikirkan','dirampas','diremehkan','dirugikan',
			'disalahgunakan','disalahpahami','disayangkan','disebut-sebut','disederhanakan','disengaja','disengketakan','disiram',
			'diskredit','diskriminasi','diskriminatif','disorient','disproporsional','distorsi','ditakdirkan','ditinggalkan','ditipu',
			'ditolak','dogmatis','dominan','dongkol','dosa','downgrade','drastis','drop-out','dua wajah','dugaan','duka','dukun',
			'dumping','dungu','duniawi','dupa','durhaka','duri','dusta','dusun','dwimakna','edan','egois','egoisme','egomania','egosentris',
			'ejek','ejekan','ekonomis','eksploitasi','eksploitatif','eksplosif','ekstremis','enggan','enggan membantu','erosi',
			'fana','fanatik','fanatisme','fantastis','fasis','fasisme','fatal','fiksi','fitnah','fitnahan','fobia','friksi',
			'frustasi','frustrasi','fundamentalis','fundamentalisme','ga jelas','ga karuan','ga peka','gadungan','gagal','gagap',
			'gaib','galak','ganas','gangguan','ganjil','ganti rugi','gantung','garang','garis keras','garu','gasang','gatal','gegabah',
			'gejala','Gejala','gelandangan','gelap','gelisah','gelora','gembar-gembor','gendut','genit','genosida','genting','gerah',
			'geram','gerombolan','gesekan','gesper','getah','getaran','giat','gigih','gigil','gila','gila hormat','gila ketakutan',
			'gila-gilaan','godaan','goreng','goresan','gosip','goyah','goyangan','gua','gugup','gurun','gusar','habis','hak milik',
			'hal merendahkan diri','hal tidak dimengerti','halangan','hama','hambatan','hampir','hampir mati','hancur','hang','haram',
			'harga di atas','hasutan','haus','haus darah','hedon','hedonistik','hegemoni','hegemonisme','hemat','hidung belang','hina',
			'hingar-bingar','hiruk-pikuk','histeri','histeria','histeris','hujat','hukuman','hukuman penjara','hukuman setimpal','hutang',
			'iblis','idiot','igauan','ih','ikut campur','ilegal','Iluminati','ilusi','imajiner','imperialis','impoten','impulsif',
			'individualis','indoktrinasi','infeksi','inferioritas','inflamasi','inflasi','ingusan','inkompeten','inkompetensi',
			'inkonsistensi','inkonstitusionil','insensitively','interupsi','intimidasi','intrusi','invasif','irasional','irasionalitas',
			'iri','Iritasi','ironi','ironis','ironisnya','isolasi','istirahat','isu','jadah','jahanam','jahat','jalan buntu',
			'jalan keluar','jancuk','jancok','janggal','jatuh','jatuh sakit','jauh','jebakan','jelaga','jelas','jelatang','jelek','jelu',
			'jempol kebawah','jenaka','jengkel','jerat','jerawat','jeritan','jeruk nipis','jijik','jompo','jumlah sedikit','kabur',
			'kabut','kacau','kadaluarsa','kadung','kafir','kagum','kain kafan','kaku','kalah','kalahan','kambing hitam','kambuh',
			'kampungan','kandang','kandas','kanibal','kanker','kantong sampah','kapak','kapalan','karat','kasar','kasihan','kata-kata kasar',
			'katastropi','keadaan acuh tak acuh','keadaan buruk','keadaan darurat','keadaan pingsan','keadaan sulit','keanehan',
			'keangkuhan','kebal','kebencian','keberanian','keberatan','keberbahayaan','kebetulan','kebiadaban','kebiasaan','kebingungan',
			'KEBINGUNGAN','kebiri','kebisingan','kebobolan','kebocoran','kebodohan','kebohongan','kebosanan','kebrutalan','kebuntuan',
			'keburukan','kecabulan','kecaman','kecanduan','kecapaian','kecelakaan','kecelakaan kapal','kecemasan','kecemburuan',
			'kecenderungan','kecenderungan untuk menurun','kecerobohan','kecewa','kecil','kecongkakan','kecurangan','kecurigaan',
			'kedangkalan','kedengkian','keengganan','kefanatikan','kegagalan','keganasan','kegarangan','kegelapan','kegelisahan',
			'kegemparan','kegemukan','kegilaan','kegoyangan','kegugupan','kehabisan','kehancuran','kehebohan','Keheranan','kehilangan',
			'kehilangan keseimbangan','kehinaan','keinginan pribadi','keingkaran','keirasionalan','kejahatan','kejam','kejang',
			'kejanggalan','kejangkitan','kejatuhan','kejelekan','kejengahan','kejengkelan','keji','kejut','kekacauan','kekakuan',
			'kekalahan','kekanak-kanakan','kekecewaan','kekecilan','kekejaman','kekejamannya','kekeliruan','kekenyangan','kekerasan',
			'kekerasan pendirian','kekeringan','kekesalan','kekhawatiran','kekhilafan','kekosongan','kekotoran','kekuatiran','kekurangan',
			'kekurangpekaan','kelakuan buruk','kelalaian','kelambanan','kelancangan','kelangkaan','kelaparan','kelas dua','kelelahan',
			'kelemahan','kelemahan karena usia tua','kelembutan','kelesuan','keletihan','keliru','keluar','keluhan','Keluhan','kelupaan',
			'kemacetan','kemalangan','kemalasan','kemandekan','kemarahan','kemasukan setan','kemasyhuran','kematian','kembali','kemelaratan',
			'kemenduaan','kemerosotan','kemiskinan','kemunafikan','kemunduran','kemurkaan','kemurungan','kemustahilan','kendor',
			'kendur','kenekatan','kental','kepahitan','kepala batu','kepala-sakit','kepatahan','kepedaran','kependekan','kepentingan',
			'kepentingan diri sendiri','kepicikan','keputusasaan','keputusasan','keracunan','keraguan','kerangka','keras','keras hati',
			'keras kepala','keras-kapal','kerasnya','kerdil','kere','kerepotan','kereta','keretakan','keriangan','keributan','kerinduan',
			'kering','keriput','keriuhan','kerlip','keroncongan','kerugian','Kerugian','kerusakan','kerusuhan','kerut','keruwetan','kesal',
			'kesalahan','kesalahan besar','kesalahan hitung','kesalahpahaman','kesamaan','kesedihan','keseganan','kesegeraan',
			'kesembronoan','kesendirian','kesengitan','kesengsaraan','kesepian','keserakahan','keseriusan','kesesakan','kesilauan',
			'kesombongan','kesulitan','kesuraman','kesyahidan','ketabahan','ketakberanian','ketakutan','ketamakan','ketat','ketegangan',
			'ketenangan','keterbatasan','keterbelakangan','keterlaluan','ketiadaan','ketiadaan rasa hormat','ketidakabsahan',
			'ketidakadilan','ketidakakuratan','ketidakamanan','ketidakbahagiaan','ketidakberdayaan','ketidakbijaksanaan','ketidakcakapan',
			'ketidakcocokan','ketidakcukupan','ketidakefektifan','ketidakefisienan','ketidakjelasan','ketidakjujuran','ketidakkasihan',
			'ketidaklogisan','ketidakmampuan','ketidakmampuan menyesuaikan diri','ketidakmungkinan','ketidakmurnian','ketidakpantasan',
			'ketidakpedulian','ketidakpercayaan','ketidakpuasan','ketidakrelevanan','ketidaksabaran','ketidaksamaan','ketidakseimbangan',
			'ketidaksempurnaan','ketidaksenangan','ketidaksenonohan','ketidaksetaraan','ketidaksetiaan','ketidaksopanan','ketidakstabilan',
			'ketidaktahuan','Ketidaktelitian','ketidaktelitian','ketidakteraturan','ketidaktertarikan','ketidaktoleranan','ketidaktulusan',
			'ketinggalan','ketukan','ketus','kewajiban','kewalahan','kezaliman','khawatir','khayalan','khayalan belaka','khayali','khianat',
			'khusus','kiamat','kikir','kikuk','kios','kisi','klik','klise','knalpot','kolot','kompatibel','kompleks','komplikasi',
			'komplotan','kompong','konflik','konfrontasi','kongkalikong','konservatif','konsesi','konspirasi','konspiratif','konspirator',
			'kontaminasi','kontensius','kontol','kontra','kontra-produktif','kontradiksi','kontradiktif','kontraproduktif','kontroversi',
			'kontroversial','konyol','korban','korban kecelakaan','korosi','korosif','korup','korupsi','kotor','kotoran','kram','krisis',
			'kritik','kritikus','kritis','kronis','kuat','kuatir','kucam','kucing gemuk','kudung','kukuh','kuning','kuno','kupas','kurang',
			'kurang ajar','kurang baik','kurang berkembang','kurang beruntung','kurang dikenal','kurang lengkap','kurang menarik',
			'kurang pengalaman','kurang sehat','kurang sopan','kurus','kusut','kutukan','labil','labu','lacur','lalai','lalim','lama',
			'lamban','lambat','lancang','lancar','lapis kedua','lapuk','larangan','larut','latency','lawan','lebam','lebih buruk',
			'lebih keras','lebih mahal','lebihan','lecet','ledakan','lekat','lekir','lekuk','lelah','lelucon','lemah','lemak','lemak-kucing',
			'lemas','lembab','lembek','lemot','lendir','lengkap','lengket','lepas','lereng','lesu','letih','letusan','liar','licik','licin',
			'lier','limbah','limbung','linglung','lintah','lirik','longgar','luah','luar biasa','lubang angin','lucu','luka','luka bakar',
			'luka lecet','lumpuh','lumpur','lunak','lupa','lusuh','Maaf','mabuk','mabuk kepayang','mafia','mahal','main mata',
			'main perempuan','mainan kerincingan','makian','makin','malang','malapetaka','malas','malu','malu-malu','mampat','mandek',
			'manipulasi','manipulatif','manipulator','manja','marah','marah-marah','marginal','masalah','masam','mati','mati kelaparan',
			'mati lemas','mati rasa','mati-matian','mau bertobat','megah','megap-megap','melalaikan','melambat','melampiaskan',
			'melancarkan','melanggar','melanggar hukum','melanggar susila','melarang','melarikan diri','melawan hukum','melayu',
			'melebih-lebihkan','melecehkan','meledak','melelahkan','melemahkan','melenceng','melengking','melengkingkan','melengkung',
			'melenyapkan','melepaskan','melepuh','meleset','meletakkan-off','melibatkan','melimpahi','melinglungkan','melodramatis',
			'melongo','melongsorkan','melucuti senjata','melukai','meluluhkan','melumpuhkan','melunakkan','meluruhkan','memabukkan',
			'memadamkan','memakan waktu','memaksa','memaksakan','memalsukan','memalukan','memamerkan','memanaskan','seru','memancing',
			'memandang dengan marah','memandang rendah','memanjakan','memar','memarahi','memarahkan','memarut','semangat', 'sahur',
			'mematikan','membagi','membahas','membahayakan','membakar','membalas','membalikkan','membanjiri','membantah','Membantah',
			'membara','membatalkan','membatasi','membatu','membayar lebih','membedakan','membeku','membekukan','membela','membelit',
			'membenci','membengisi','memberatkan','memberhentikan','memberontak','membinasakan','membingungkan','membohong','memboikot',
			'memboikot dr masyarakat','membolos','membombardir','membongkar','membosankan','membuang','membuang waktu','membuat',
			'membuat bersedih hati','membuat bingung','membuat kasar','membuat malu','membubuhi gula','membujuk','membunuh','memburuk',
			'memburukkan','memburuknya','membusuk','membutakan','memecat','memekakkan telinga','memenjarakan','mementingkan diri sendiri',
			'memeras','memerciki','memerintahkan','memfitnah','memihak','memikat','memisahkan','memiskinkan','memohon','memperberat',
			'memperbudak','memperdaya','memperdayakan','memperingatkan','memperkosa','memperlambat','memperlemah','mempersiapkan',
			'mempesona','mempolemikkan','memprihatinkan','mempropagandakan','memprotes','memprovokasi','memuakkan','memuaskan diri',
			'memudarnya','memukul','memukul dengan tongkat','memukul mundur','memuntahkan','memurahkan','memusnahkan','memutar',
			'memutarbalikkan','memutuskan','menabrak','menahan','menakuti','menakutkan','menampar','menanamkan','menangis',
			'menarik diri','menarik kembali','menarik perhatian','menaruh simpati','menasihati','mencabut','mencabut perlindungan hukum',
			'mencaci','mencairkan','mencampuradukkan','mencampuri','mencap','mencekik','mencela','mencemari','mencemaskan','mencemoohkan',
			'mencibir','mencicit','mencium','menciut-ciut','mencla-mencle','mencolok','mencopoti','mencubit','mencuci otak','mencuri',
			'mencurigakan','mendadak','mendakwa','mendatang','mendatangkan','mendeklamasikan','menderita','menderita khayalan',
			'menderita sekali','mendesak','mendesis','mendidih','mendistorsi','menduduki','menegur','menekan','menekankan','menelan',
			'menentang','menertawakan','menetes','mengabaikan','mengaburkan','mengacak','mengacaukan','mengaku','mengakui','mengalah',
			'mengalahkan','mengalihkan','mengambil alih','mengamputasi','mengamuk','mengancam','mengancam jiwa','mengangkat bahu',
			'menganiaya','mengatakan','mengebiri','mengecam','mengecewakan','mengecilkan','mengecilkan hati','mengejan','mengejek',
			'mengejuntukan','mengejutkan','mengeksploitasi','mengeluarkan','mengeluarkan isi perut','mengeluh','mengelupas','mengembara',
			'mengemis','mengendapkan','mengepung','mengerang','mengeras','mengerdilkan','mengerikan','mengering',
			'mengerjakan dengan kurang baik','mengerti','mengerut','mengesalkan','menggagalkan','menggampangkan','mengganggu',
			'mengganggu ketenangan','menggantikan','menggantung','menggaruk','menggarut','menggasak','menggelapkan','menggelegar',
			'menggelepar','menggeliat-geliut','menggelikan','menggelisahkan','menggemparkan','menggentari','menggerakkan','menggeram',
			'menggerenyet','menggerogoti','menggertak','menggerutu','menggigil','menggigit','menggila','menggiling','menggoda',
			'menggoyang','menggugat','menggugurkan','menggulingkan','menggusarkan','menghadapi','menghalangi','menghalau','menghambat',
			'menghancurkan','menghantui','menghapus','menghapuskan','menghasut','menghebohkan','mengherankan','menghilangkan','menghina',
			'menghinakan','menghindari','menghujat','menghukum','menghukum sebelum memeriksa','mengigau','mengikis','mengindoktrinasikan',
			'mengingkari','menginjak-injak','mengintai','mengintimidasi','mengintip','mengisap','mengkhawatirkan','mengkhianati',
			'mengkritik','mengoceh','mengolesi','mengolok-olok','mengomel','mengorbankan','mengotori','mengotorkan','mengoyakkan',
			'menguap','menguasai','mengumpat','mengumumkan kekurangan','mengundurkan diri','menguntungkan','mengurangi','menguras',
			'mengusir','mengutuk','Mengutuk','meniadakan','menidurkan','menimbulkan','menimbulkan kebencian','menimpa','menindas',
			'meninggal','meninggal dunia','meninggalkan','meningkat','meninju','menipu','menitis','menjadi kaya','menjadi terlalu panas',
			'menjarah','menjatuhkan','menjauhkan','menjauhkan diri','menjelekkan','menjemukan','menjengkelkan','menjerat','menjerit',
			'menjijikkan','menjiplak tulisan','menodai','menohok','menolak','menonjol','mentah','menuduh','menumbangkan','menumpahkan',
			'menunda','menunduk','menundukkan','menuntut','menurun','menurunkan','menurunkan nilai','menusuk','menutup jalan','menyaingi',
			'menyakiti','menyakitkan','menyala','menyalahgunakan','menyalahkan','menyangkal','menyangsikan','menyapa','menyayangkan',
			'menyayat','menyayat hati','menyebalkan','menyederhanakan','menyedihkan','menyelinap','menyembunyikan','menyenangkan',
			'menyengat','menyentakkan','menyerah','menyeramkan','menyerang','menyerbu','menyeret','menyesali','menyesalkan','menyesatkan',
			'menyesatkan pikiran','menyia nyiakan','menyiangi','menyihir','menyiksa','menyilaukan','menyimpang','menyindir','menyinggung',
			'menyita pikiran','menyolok','menyombongkan','menyumbat','menyumpahi','menyusahkan','menyusup','menyusut','meracuni','meragukan',
			'merajalela','merajuk','merampas','merana','merancang','merangsang','merasa jijik','merata','meratap','meratapi','meraup',
			'merayap','merebut','makasih','meremas','meremehkan','merencanakan','merendahkan','merendahkan martabat','merengek','merenung','merepet',
			'meresahkan','meretas','merinding','meringis','merobek','merokok','merongrong','merosot','merugikan','merusak','merusak akhlak',
			'merusak bentuk','merusakkan','mewah','meyakinkan','mimpi buruk','miring','misinformasi','miskin','misteri','misterius','mitos',
			'momok','mubazir','mudah terharu','mudah tersinggung','mudah tertipu','multi-polarisasi','munafik','mundur','mungil','mungkin',
			'mungkir','muntah','muntahan','muntahan kebencian','murah','murahan','muram','murka','murtad','murung','muslihat','mustahil',
			'musuh','nafsu berahi','nafsu berperang','naif','najis','nakal','ndeso','negatif','nekat','nenek','nepotisme','neraka',
			'neurotik','ngambek','ngawur','ngelantur','ngeri','ngobrol','ngomel','noda','noda-noda','non-aktif','non-keyakinan','nyaring',
			'nyengir','nyeri','nyinyir','nyonya','obat bius','obrolan','obsesif','obyek','ocehan','ogah-ogahan','omelan','omong kosong',
			'oportunistik','oposisi','orak','orang asing','orang bodoh','orang buangan','orang canggung','orang celaka','orang dungu',
			'orang fanatik','orang gila','orang ingkar','orang kikir','orang luar','orang membenci','orang miskin','otokrat','otokratis',
			'otoriter','overakting','padat','pagar','pahit','paksaan','paling aneh','paling kejam','paling lambat','paling menakutkan',
			'palsu','panas','panci','pandangan marah','pandangan yg menghinakan','panggilan','panggilan dari pengadilan','panik','panjang',
			'paradoks','paradoksal','parah','paranoia','paranoid','parasit','paria','parno','parodi','partisan','pasif','pasrah','pasti',
			'patah','patah hati','patuh','patung','payudara','pecah','pecahnya','pecandu','pecundang','pedas','pedih','pekerja buruk',
			'pekerjaan rumah','pelabuhan','pelacur','pelakunya','pelalaian','pelan-pelan','pelanggar','pelanggar hukum','pelanggaran',
			'pelanggaran hukum','pelawak','pelemahan','pelepasan nafsu berahi','pelit','pelupa','pemabuk','pemalas','pemalsuan','pemarah',
			'pembakar','pembakaran','pembalasan','pembangkang','pembangkangan','pembantaian','pembatalan','pembaur','pembekuan','pembela',
			'pembenci','pembengkakan','pemberang','pemberontakan','Pembobolan','pembohong','pembongkar','pemborosan','pembual',
			'pembuangan','pembuatan','pembubaran','pembukaan lagu','pembunuh','pembunuhan','pembunuhan besar-besaran','pemecahan',
			'pemegatan','pemerasan','pemerkosaan','pemfitnah','pemfitnahan','pemilih','pemisahan','pemotongan','pemukulan','pemusnahan',
			'pemutarbalikan','penaklukan','penakut','penalti','penangkapan','pencegah','pencemar','pencemas','pencurian','pendapat',
			'pendendam','penderita','penderitaan','penderitaan mendalam','pendosa','penekanan','pengabaian','pengacau','pengaduan',
			'pengakuan','pengamuk','penganggur','penganiaya','penganiayaan','pengap','pengasingan','pengeboman','pengecualian','pengecut',
			'pengemis','pengenaan','pengepungan','pengeringan','pengganggu','penggerutu','penghancuran','penghasut','penghinaan',
			'penghindaran','penghujatan','penghukuman','pengingatan','pengingkaran','pengiring jenazah','pengkhianat','pengkhianatan',
			'pengkritik','pengobrol','pengotor','pengrusakan','pengumpatan','pengunduran diri','pengurangan','penindas','penindasan',
			'penipu','penipuan','penjahat','penjara','penjara gelap bawah tanah','penjarah','penolakan','penuh','penuh benci','penuh celaan',
			'penuh curiga','penuh dosa','penuh sesal','penumpasan','penundaan','penurunan','penurut','penyadap','penyakit',
			'penyakit gila','penyalahgunaan','penyangkalan','penyederhanaan berlebihan','penyelewengan','penyembunyian','penyendiri',
			'penyerbu','penyergapan','penyesalan','penyesat','penyesatan','penyiksaan','penyimpang','penyimpangan','penyisihan','penyok',
			'penyuapan','penyusup','peot','peradangan','perampas','perampasan','perangkap','perasaan geli','perasaan waswas','perawan tua',
			'perbedaan pendapat','perbuatan jahat','perbudakan','perdarahan','perebut','perempuan jahanam','perfidity','pergolakan',
			'perhatian','perih sekali','peringatan','perjuangan','perkelahian','perlakuan kejam','perlawanan','perlu','permohonan',
			'permusuhan','perpecahan','persahabatan','persaingan','perselisihan','pertempuran','pertengkaran','pertengkaran sengit',
			'pertentangan','pertikaian','pertumpahan darah','pertunjukkan','perubahan','perusak','pesimis','pesimisme','pesimistis',
			'pesta','pesta besar','pesuruh','petualangan','PHK','picik','picketed','pidana','piket','pikun','pilih-pilih','pimpinan salah',
			'pincang','pingsan','pisah','pisau','piuh','plin-plan','polusi','prasangka','pratfall','prihatin','primitif','propaganda',
			'protes','provokasi','provokatif','puas','pucat','pukulan','punah','punk','pura-pura','pusing','putus','putus asa','racun',
			'radikal','Radikal','radikalisasi','ragu','ragu-ragu','rajin','raksasa','ramai','rambut rontok','rampasan','rantingly','rants',
			'rapuh','rasa bersalah','rasa cemas','rasa gelisah','rasa sakit','rasa suram','rasa tidak berterimakasih','rasa tidak enak',
			'rasis','rasisme','reaksioner','realistis','rebusan','redundansi','redup','relevan','remang','remang-remang','remeh','remehkan',
			'rendah','rendah dinilai','rendahan','rentan','represi','represif','reruntuhan','resah','resesi','retak','retorik','retoris',
			'rewel','reyot','ribet','ribut','rintik','risiko','riuh','roboh','rongsokan','ruam','rumah kaca','rumit','rumor','runtuh',
			'rusak','rusuh','sabar','sabotase','sakit','sakit dirancang','sakit hati','sakit kepala','sakit punggung','sakit saraf',
			'sakit-dibentuk','sakit-didefinisikan','sakit-digunakan','sakit-dipahami','sakit-penggunaan','sakitan','sakitnya tuh disini',
			'salah','Salah','salah baca','salah hitung','salah informasi','salah membaca','salah menafsirkan','salah mengerti',
			'salah mengucapkan','salah mengurus','salah menilai','salah menyebutkan','salah paham','salah pikiran','salah saji',
			'salju longsor','saluran air','sama sekali','samar','samaran','sambilan','sampah','sandal bakiak','sandera','sangat',
			'sangat efektif','sangat jahat','sangat lapar','sangat marah','sangat menakjubkan','sangat sedikit','sanggahan','sarkasme',
			'sarkastik','saru','satir','satiris','sayangnya','sebelum waktunya','sedang saja','sederhana','sedih','sedikit','segan',
			'segera','sejajar','selai','selang','selendang','selingan','selokan','sembarangan','sembrono','semburan','sementara','sempit',
			'semrawut','sendirian', 'sengit','sensasi','sensasional','sensasionil','sentakan','sepakan','sepele','serakah','seram',
			'serampangan','serangan','Serangan','serangan gencar','seret','serius','serong','sesat','setan','setengah hati','setia',
			'sewenang-wenang','shamefulness','shamelessness','sia-sia','sial','sialan','sikap','siksaan','sindiran','sindroma','singkat',
			'sinis','sinisme','sinting','siput','sirep','sisa-sisa','sisi bawah','sisi buta','siuman','skandal','skeptis','sobek','sok',
			'sok nasehati','sok ngatur','sombong','sporadis','stagnasi','statis','steal','stereotip','stres','suam','suar','subversif',
			'suka memandang rendah','sulit','sumbang','sundal','suram','susah','syok','tabir asap','tabu','tahayul','tahi','tai','tajam',
			'taji','tak ada artinya','tak bahagia','tak baik','tak berarti','tak berdaya','tak bergairah','tak berguna','tak beriman',
			'tak bermutu','tak bernyawa','tak berperasaan','tak berperikemanusiaan','tak berpindah-pindah','tak bersedia','tak biasa',
			'tak dihargai','tak henti-hentinya','tak hormat','tak jelas','tak kelihatan','tak kenal ampun','tak kompeten','tak layak',
			'tak menentu','tak pernah puas','tak populer','tak putus-putusnya','tak sehat','tak sepakat','tak setuju','tak tahu malu',
			'tak tentu','tak terbayangkan','tak terbedakan','tak terdamaikan','tak terduga','tak terelakkan','tak terhindarkan',
			'tak terhitung','tak terkatakan','tak terkendalikan','tak terpecahkan','tak terpenuhi','tak tertahankan','takhyul','takut',
			'tamak','tamparan','tandus','tangki','tanpa','tanpa alasan','tanpa ampun','tanpa belas kasihan','tanpa berpikir',
			'tanpa cinta','tanpa dasar','tanpa diketahui','tanpa hasil','tanpa henti','tanpa hukum','tanpa iman','tanpa kompromi',
			'tanpa malu','tanpa pandang bulu','tanpa rebewes','tanpa sadar','tanpa semangat','tanpa tujuan','tantangan','tawanan',
			'tawar-menawar','tebal','tegang','tegar','teguran','tekanan','telanjang','teliti','tenggelam','tenggelamnya','tengkar',
			'teralihkan','teramat','teramati','terampil','terang-terangan','terangsang','terasa tidak enak','terasing','terbalik',
			'terbandingkan','terbatas','terbawah','terbayangkan','terbelakang','terbodoh','terbuang','terbujuk','terbukti','terbunuh',
			'terburu nafsu','terburuk','tercela','tercemar','terdefinisi','terdelusi','terduga','terencana','terfragmentasi','tergagap',
			'terganggu','tergenang','tergesa-gesa','terhalang','terhambat','terhina','terhukum','teriakan','terik','terinfeksi',
			'terinfestasi','terjal','terjangan','terjangkau','terjawab','terjelek','terkejut','terkena','terkenal','terkenal jahat',
			'terkesima','terkulai','terkutuk','terlalu','terlalu banyak','terlalu berani','terlalu bersemangat','terlalu besar',
			'terlalu mahal','terlalu menekankan','terlalu tinggi','terlambat','terlantar','terlarang','terlepas','terlibat','termiskin',
			'ternoda','teror','terorirs','terorisme','terpencil','terpengaruh','terperangkap','terperanjat','terputus-putus',
			'tersandung','tersangka','tersangkut','tersedak','terselesaikan','terselubung','tersembunyi','tersembunyi dan membahayakan',
			'tersendat','tersentak-sentak','tersiksa','tersinggung','tersumbat','tertagihnya','tertahankan','tertanam di hati',
			'tertancap','tertandingi','tertarik','tertekan','tertempa','tertinggal','tertipu','terurai','tiba-tiba','tidak','tidak ada',
			'tidak ada reaksi','tidak adil','tidak akurat','tidak aman','tidak bagus','tidak benar','tidak beralasan','tidak berharga',
			'tidak berhasil','tidak berhati-hati','tidak berkelanjutan','tidak berperasaan','tidak bertanggung jawab','tidak bijaksana',
			'tidak cakap','tidak cukup','tidak curiga','tidak dapat diandalkan','tidak dapat digunakan','tidak dapat dipertahankan',
			'tidak dapat diterima','tidak dibutuhkan','tidak didukung','tidak diinginkan','tidak diketahui','tidak disukai',
			'tidak efektif','tidak efisien','tidak etis','tidak hormat','tidak jelas','tidak jujur','tidak kompeten','tidak kompetitif',
			'tidak konsisten','tidak kreatif','tidak kuat','tidak layak','tidak lazim','tidak lengkap','tidak logis','tidak mampu',
			'tidak masuk akal','tidak memadai','tidak mematuhi','tidak membantu','tidak memiliki','tidak memuaskan','tidak menarik',
			'tidak mendukung','tidak menghargai','tidak menyenangkan','tidak menyetujui','tidak menyukai','tidak mungkin',
			'tidak nyaman','tidak ortodoks','tidak pantas','tidak peduli','tidak peka','tidak penting','tidak perlu','tidak praktis',
			'tidak produktif','tidak puas','tidak ramah','tidak rasional','tidak resmi','tidak sama','tidak sebanding',
			'tidak seimbang','tidak sempurna','tidak setuju','tidak sopan','tidak suka','tidak tahu berterima kasih','tidak tegas',
			'tidak tepat','tidak terbaca','tidak terbukti','tidak terdengar','tidak terduga','tidak terkalahkan','tidak tersedia',
			'tidak tetap','tidak tulus','tidak wajar','tikungan','tikus','timbunan','timidness','timpang','tindak pencegahan',
			'tindakan ekstrimis','tindakan merugikan','tindakan yg bodoh','tinggi harga-','tinggi hati','tinju','tipis','tipu',
			'tipu daya','tipu muslihat','tirani','tolol','topangan','totaliter','tragedi','tragis','traped','trauma','traumatis',
			'tuduhan','Tuduhan','tukang daging','tukang fitnah','tukang jualan','Tukang onar','tuli','Tumbang','tumpul','tuna karya',
			'tunggul','Tunggul','tusukan','uap','ugal-ugalan','ulang','ular berbisa','ultimatum','ultra-garis keras','umpan',
			'umpatan','untuk sementara','usang','usil','utuh','vagina','virus','volatil','vulgar','wabah','waria','was-was',
			'waspada','wastafel','ya silahkan saja','Yahudi', 'hoax']
	}
};
var cekwordInDoc = function(word, _class, delta){
	if (arguments.length < 3) delta = 1;
	if (!(word in wordInDoc[_class])) wordInDoc[_class][word] = 0;
	wordInDoc[_class][word] += delta;
	return this;
};
var train = function(_class, docs) {
	docs = stopword.stopwords(docs);
	for (var i = 0;i < docs.length; i++) {
		word = docs[i];
		if (vocab[_class] && vocab[_class][wd].indexOf(word) !== -1) {
			cekwordInDoc(word, _class, 1);
		}
		if (!(_class in sumAllDocs)) sumAllDocs[_class] = 0;
		sumAllDocs[_class]++; 
	}
	if (!(_class in docsByClass)) docsByClass[_class] = 0;
	docsByClass[_class]++;
	sumDocs++;
};
var prior = function(_class){
	var priori = (docsByClass[_class] / sumDocs);
	return priori;
};
var countV = function(){
	let vc = sumAllDocs.positif + sumAllDocs.negatif;
	return vc;
};
var getword = function(_class, word){
	var ww = (word in wordInDoc[_class] ? wordInDoc[_class][word] : 0);
	return ww; 
};

var likelihood = function(_class, docs) {
	var result = 1;
	for (var word of docs){
		var probWord = (getword(_class, word) + 1) / (sumAllDocs[_class] + countV());
		result *= probWord;
	}
	return result;
};
var probabilities = function (docs) {
	docs = stopword.stopwords(docs);
	let result = {};
	for (let _class in wordInDoc) {
		result[_class] = prior(_class) * likelihood(_class, docs);
	}
	return result;
};
var classify = function (docs){
	docs = stopword.stopwords(docs);
	let highest = -Infinity, result = null;
	for (let _class in wordInDoc) {
		let probability = prior(_class) * likelihood(_class, docs);
		if (probability === highest) {
			result = 'netral';
		}
		if (probability > highest) {
			highest = probability;
			result = _class;
		}
	}
	return result;
};
var classifyplus = function (docs){
	docs = stopword.stopwords(docs);
	console.log(docs);
	let highest = -Infinity, result = null, nilai = [];
	for (let _class in wordInDoc) {
		let probability = prior(_class) * likelihood(_class, docs);
		nilai.push(`${_class}  :  ${probability}`);
		if (probability === highest) {
			result = 'netral';
		}else if (probability > highest) {
			highest = probability;
			result = _class;
		}
	}
	return {hasil : result, nilai : nilai};
};
let retraining = function () {
	console.log(wordInDoc);
	console.log(sumDocs);
	console.log(sumAllDocs);
	console.log(docsByClass);
	console.log(countV());
	wordInDoc = {
		positif: {},
		negatif: {}
	};
	sumDocs = 0;
	sumAllDocs = {};
	docsByClass = {};
};
module.exports = {train, classify, probabilities, classifyplus, retraining};