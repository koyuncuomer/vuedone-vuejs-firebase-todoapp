# VueDone - VueJS Firebase Todo App

VueDone, Vue.js ve Firebase kullanılarak geliştirilmiş, kullanıcıların görev ve yapılacak listelerini yönetmelerine olanak sağlayan bir web uygulamasıdır.


https://github.com/user-attachments/assets/650dfd30-ad67-4d94-89fc-3525e1f1dd19


## 📋 Özellikler

- Kullanıcı Kimlik Doğrulama: Kayıt olma, giriş yapma
- Görevlerin Yönetimi: Görev ekleme, düzenleme, tamamlama ve silme
- Arşivleme Sistemi: Tamamlanan görevleri arşivleme ve gerektiğinde geri getirme
- Gerçek Zamanlı Veri Senkronizasyonu: Firebase Firestore ile anlık güncellemeler

## 🛠️ Teknolojiler

- Vue.js 3
- Firebase (Authentication, Firestore)
- Vue Router
- Vite

## 🚀 Kurulum
1. Repo'yu klonlayın:
```sh
git clone https://github.com/koyuncuomer/vuedone-vuejs-firebase-todoapp.git
cd vuedone-vuejs-firebase-todoapp
```

2. Bağımlılıkları yükleyin:
```sh
npm install
```

3. `.env` dosyasını oluşturun ve Firebase yapılandırma bilgilerinizi ekleyin:
```sh
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Geliştirme sunucusunu başlatın:
```sh
npm run dev
```
