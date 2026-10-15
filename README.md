# GECC1130 反思習作網頁｜我的大學路

崇基學院 GECC1130 *Idea of a University* 反思習作（約 30%）的單頁作品集骨架。  
**版面與結構已備好；所有反思正文請你自己填寫。**

## 如何開啟

1. 用檔案管理員進入本資料夾 `gecc1130-portfolio`
2. 雙擊 `index.html`，或在終端機執行：
   ```bash
   # 任選其一
   open index.html          # macOS
   xdg-open index.html      # Linux
   start index.html         # Windows
   ```
3. 亦可把整個資料夾上傳到 GitHub Pages、Netlify、Cloudflare Pages 等，再把公開連結貼到 Blackboard（請依課程最新繳交說明）

## 頁面結構

| 區塊 | 內容 |
|------|------|
| Hero | 標題、姓名欄、大學生身份（已預填方向） |
| 願景與使命 | 已預填事實 +「我的闡述」空白 |
| 三大 SMART 目標 | 空間規劃／First Honour／Mobility 賦權；各含課堂連繫提示 |
| 行動時間線 | 現在 → 2026-12 → 2027-05 |
| 身心社靈 | 四格短填 |
| 檢討機制 | 週期／方法／肯定 |
| 結語與承諾 | 空白 |
| Footer | 課程資訊與 AI 政策提醒 |

## 你要填什麼

- 所有虛線框、標示「【請在此填寫…】」的地方
- Hero 的「【請填寫姓名】」
- 目標 3 的 A/R 資源欄（若需要）
- 建議在瀏覽器直接點框輸入；寫完後可用「另存為」或列印成 PDF 備份  
  （`contenteditable` 內容**不會**自動存進檔案；請自行複製到文件，或編輯 `index.html` 把文字寫死）

### 較穩妥的寫作方式

1. 先在 Word／Google 文件寫完 800–1,000 字
2. 再把各段貼進對應區塊（可直接改 `index.html` 裡對應的空白 `div`，改成普通 `<p>`）
3. 瀏覽器開啟檢查手機版與列印預覽

## 字數提示

- 課程要求約 **800–1,000 字**（中文）
- 預填的願景／SMART 標籤／課堂提示**不算**你的反思正文；請用自己的話展開「我的闡述」「課堂連繫」「行動與反思」「結語」
- 可用文件字數統計；網頁本身不自動計字

## 重要：AI 使用政策

- 本網站僅提供**結構、版面與已確認的事實標籤**（目標數字、期限、你選定的課堂連繫方向）
- **禁止**用生成式 AI 代寫任何書面作業正文
- 課程大綱允許的範圍請自行核對；如有疑問可向 `cccge@cuhk.edu.hk` 查詢
- 請用自己的經驗與課堂筆記填寫所有反思段落

## 檔案

- `images/` — Unsplash 免費授權圖片（hero、目標卡、社區、校園）


- `index.html` — 主頁
- `styles.css` — 樣式（深藍綠／米色學術風格）
- `script.js` — 導覽與平滑捲動
- `README.md` — 本說明

繳交期限提示：約 **2026-11-02**（請以 Blackboard／課程公布為準）。

## 圖片（Unsplash License）

本站使用 [Unsplash](https://unsplash.com/) 免費授權相片。本機 `images/` 同時有 `.jpg` 與發布用 `.svg`（內嵌 JPEG，方便上傳）。

| 檔案 | 主題 | Unsplash 來源 |
|------|------|----------------|
| `images/hero-city` | 城市黃昏街景 | https://images.unsplash.com/photo-1449824913935-59a10b8d2000 |
| `images/goal-spatial` | 地圖／空間規劃 | https://images.unsplash.com/photo-1524661135-423995f22d0b |
| `images/goal-study` | 圖書館求學 | https://images.unsplash.com/photo-1521587760476-6c12a4b040da |
| `images/goal-mobility` | 單車／流動出行 | https://images.unsplash.com/photo-1571068316344-75bc76f77890 |
| `images/community` | 社區對話 | https://images.unsplash.com/photo-1529156069898-49953e39b3ac |
| `images/campus` | 校園步道 | https://images.unsplash.com/photo-1541339907198-e08756dedf3f |

公開預覽（commit 釘選，較不易被 CDN 舊快取影響）：

`https://rawcdn.githack.com/yoy929981-sketch/gecc1130-portfolio/<commit>/index.html`
