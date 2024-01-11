# C0DE 程式家教網 | [DEMO](https://peg-l.github.io/project-code/index.html)

![C0DE](https://github.com/Peg-L/project-code/assets/134919211/c5fbf3dd-e0aa-4d00-b334-b83063b7223c)

## 作品說明

- 資料庫使用 json-server 技術，本作品資料庫[連結](https://github.com/Peg-L/project-code-json)

## 功能

### 測試帳號密碼

```bash
帳號： example@example.com
密碼： example
```
### 使用者故事

#### 使用者端(學生)：

- 我是使用者，我想要查看課程相關資訊

  - 我能夠從平台看到可預約的老師
  - 我能夠從平台看到老師和課程的介紹
  - 我能夠看到老師所釋出的時間表
  - 我能夠看到課程和老師的評價

- 我是使用者，我想要找到適合我的老師、課程

  - 我能夠選擇項目檢索課程（評等、類別、程度）
  - 我能夠透過關鍵字搜尋老師和課程
  - 我能夠關注課程

- 我是使用者，我想要購買課程

  - 我能夠將課程加入或刪除購物車
  - 我能夠使用優惠券
  - 我能夠下次再買指定課程
  - 我能夠付款完成訂單
  - 我能夠看到預約或訂購的資訊

- 我是使用者，我想要預約課程

  - 我能夠選擇/取消/修改上課的時間
  - 我能夠透過小聊天室跟老師商量課程

- 我是使用者，我想要上課

  - 我能夠進入上課的教室
  - 我能夠給予老師、課程評價

- 我是使用者，我想要解決我有的疑惑和問題

  - 我能夠看到常見問答

- 我是使用者，我想要登入註冊帳號

## 安裝

- Node.js 版本建議為：`18.16.0` 以上

### 取得專案

```bash
git clone git@github.com:Peg-L/project-code.git
```

### 移動到專案內

```bash
cd project-code
```

### 安裝套件

```bash
npm install
```

### 運行專案

```bash
npm run dev
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:5173/
```

## 資料夾說明

```
|- layout - 共用元件
|- pages - html 頁面
|- asset - 圖片、js、scss
    |- images - 圖片
    |- js - javascript
    |- scss - 樣式
```     

## 專案技術

- Node.js `v18.16.0`
- Vite `v4.2.0`
- axios: `v1.6.2`
- bootstrap: `v5.3.1`
- firebase: `v10.6.0`
- firebaseui: `v6.1.0`
- jquery": `v3.7.1`
- jQuery": `v1.7.4`
- jquery-ui: `v1.13.2`
- sass: `v1.61.0`
- sass-loader: `v13.2.2`
- json-server: `v0.17.4`
- json-server-auth: `v2.1.0`
