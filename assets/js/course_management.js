const test_str = `<li class="course-card shadow w-100 w-xl-75">
<div class="d-flex flex-grow-1 p-3 p-sm-4 align-items-center">
  <div class="course-card-header me-4">
    <a href="#" class="text-center">
      <div class="mb-2">
        <img
          class="avatar"
          src="./assets/images/Rectangle 7.png"
          alt="teacher"
        />
      </div>
      <h3 class="fs-7 fs-md-6 text-secondary2 mb-1">麥克先生</h3>
      <p>未預約: 3</p>
      <p>請求中: 1</p>
    </a>
    <!-- link -->
  </div>
  <div class="flex-grow-1 px-4 px-lg-8">
    <!-- 課程名稱 -->
    <div
      class="d-flex flex-md-row flex-column justify-content-md-between mb-md-0 mb-2"
    >
      <h2 class="fs-6 fs-sm-5 fs-md-4 line-ellipsis mb-2">
        從零開始成為切版大師
      </h2>
      <p>剩餘0堂</p>
    </div>
    <!-- 課程介紹 -->
    <div
      class="d-flex flex-md-row flex-column justify-content-md-between mb-2 mb-md-4"
    >
      <p class="fs-sm fs-sm-7 fs-md-6 text-justify mb-md-0 mb-4">
        50分鐘 x <span class="text-primary">1堂</span>
      </p>
      <div class="d-flex flex-md-row flex-column gap-2">
        <div class="w-150px">
          <input
            class="form-control border-light cursor-pointer jq-appointmentDate"
            type="text"
            name="accountDate1-1"
            placeholder="日期"
            value="2023/09/20"
            autocomplete="off"
            id="date"
            disabled
            required
          />
        </div>

        <div class="w-150px">
          <select
            class="form-select border border-light"
            id="time"
            disabled
          >
            <option selected>AM 09:00</option>
            <option value="AM 10:00">AM 10:00</option>
            <option value="PM 03:00">PM 03:00</option>
            <option value="PM 08:00">PM 08:00</option>
          </select>
        </div>
        <button
          type="button"
          class="btn text-primary"
          data-bs-toggle="collapse"
          data-bs-target="#save0"
          aria-expanded="false"
          aria-controls="save0"
          id="change"
        >
          修改
        </button>
      </div>
    </div>
  </div>
</div>
<!--  按鈕區塊 -->
<div
  class="course-card-footer d-flex flex-lg-row justify-content-center gap-2 gap-sm-6 p-4 bg-secondary"
  id="btnBlock"
>
  <!-- 購買按鈕 -->
  <button
    type="button"
    class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
    disabled
  >
    等待確認中
  </button>
  <a
    href="#"
    type="button"
    class="btn btn-white w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
  >
    取消預約
  </a>
</div>
<div
  class="collapse course-card-footer p-4 bg-secondary"
  id="save0"
>
  <a
    href="#"
    type="button"
    class="btn btn-white w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
    data-bs-toggle="collapse"
    data-bs-target="#save0"
    aria-expanded="false"
    aria-controls="save0"
    id="saveBtn"
  >
    儲存
  </a>
</div>
</li>`;
