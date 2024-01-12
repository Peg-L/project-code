# C0DE 程式家教網 | [DEMO](https://peg-l.github.io/project-code/index.html)

![C0DE](https://github.com/Peg-L/project-code/assets/134919211/c5fbf3dd-e0aa-4d00-b334-b83063b7223c)

- [C0DE 程式家教網 | DEMO](#c0de-程式家教網--demo)
  - [作品說明](#作品說明)
    - [發想](#發想)
  - [功能](#功能)
    - [測試帳號密碼](#測試帳號密碼)
    - [使用者故事](#使用者故事)
      - [使用者端(學生)：](#使用者端學生)
  - [安裝](#安裝)
    - [取得專案](#取得專案)
    - [移動到專案內](#移動到專案內)
    - [安裝套件](#安裝套件)
    - [運行專案](#運行專案)
    - [開啟專案](#開啟專案)
  - [資料夾說明](#資料夾說明)
  - [專案技術](#專案技術)
  - [聯絡方式](#聯絡方式)
    - [jia yu：](#jia-yu)

## 作品說明

- 資料庫使用 json-server 技術，本作品資料庫[連結](https://github.com/Peg-L/project-code-json)
- 本作品僅作業練習，無任何商業用途

### 發想

- 在學習程式時，有一部分人更喜歡也更適合找家教學習，但台灣並沒有網站專門在媒合程式家教，大家都只好透過 FB 等社群 PO 文找老師和學生。因此想要創立一個專門媒合程式家教的平台。

## 功能

### 測試帳號密碼

```bash
帳號： example@example.com
密碼： example
```

### 使用者故事

#### 使用者端(學生)：

- 我是使用者，我想要快速了解 C0DE

  - 我能夠從首頁了解熱門課程、課程分類、網站特點、評價 - **阿榮**

  ![image](https://github.com/Peg-L/project-code/assets/134919211/66789a9c-f00f-45ca-bed0-cd3b78476803)

- 我是使用者，我想要登入註冊帳號 - **阿榮**

  ![image](https://github.com/Peg-L/project-code/assets/134919211/b84f5a6d-cd93-4e8c-91c1-fa0050229c63)

- 我是使用者，我想要查看課程相關資訊

  - 我能夠從平台看到可預約的老師 - **貓咪**
  - 我能夠從平台看到老師和課程的介紹 - **貓咪**
  - 我能夠看到老師所釋出的時間表 - **貓咪**
  - 我能夠看到課程和老師的評價 - **jia yu**

  ![image](https://github.com/Peg-L/project-code/assets/134919211/ded7a7ee-eab7-4956-8721-4c4be7c3f9d2)

- 我是使用者，我想要找到適合我的老師、課程

  - 我能夠選擇項目檢索課程（評等、類別、程度） - **jia yu**
  - 我能夠透過關鍵字搜尋老師和課程 - **阿榮**
  - 我能夠關注課程 - **阿榮**

    ![image](https://github.com/Peg-L/project-code/assets/134919211/aa5f9dac-2987-429f-9d13-d3faa6c9783d)

- 我是使用者，我想要購買課程

  - 我能夠將課程加入或刪除購物車 - **jia yu、mt**
  - 我能夠使用優惠券 - **jia yu**
  - 我能夠下次再買指定課程 - **jia yu**
  - 我能夠付款完成訂單 - **jia yu**
  - 我能夠看到預約或訂購的資訊 - **jia yu**

  ![image](https://github.com/Peg-L/project-code/assets/134919211/084f090b-0150-4f2b-b6f0-78dbd3d9f65a)

- 我是使用者，我想要預約課程

  - 我能夠選擇/取消/修改上課的時間 - **貓咪**

  ![image](https://github.com/Peg-L/project-code/assets/134919211/19803631-b46c-44d6-b7f1-199589c6c514)

- 我是使用者，我想要上課

  - 我能夠進入上課的教室 - **貓咪**

- 我是使用者，我想要解決我有的疑惑和問題

  - 我能夠看到常見問答 - **阿榮**

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

## 聯絡方式

### jia yu：

- alice49885@gmail.com
