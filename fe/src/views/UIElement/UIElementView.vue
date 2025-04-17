<template>
    <!-- Icon: Sử dụng iconify design add thư viện nếu cần VD: Cần dùng material design icons thì install @iconify-json/mdi -->
  <div class="p-8">
    <div class="w-full bg-white p-4 flex flex-col gap-5">
        <!-- Typography -->
        <h1 class="text-xl font-semibold text-heading-color">Typography</h1>
        <h1 class="text-[1.65rem] font-semibold leading-5    mb-2 text-heading-color">This is heading h1</h1>
        <h2 class="text-[1.44375rem] font-semibold leading-5 mb-2 text-heading-color">This is heading h2</h2>
        <h3 class="text-[1.2375rem] font-semibold leading-5 mb-2 text-heading-color">This is heading h3</h3>
        <h4 class="text-[1.03125rem] font-semibold leading-5 mb-2 text-heading-color">This is heading h4</h4>
        <h5 class="text-[.825rem] font-semibold leading-5 mb-2 text-heading-color">This is heading h5</h5>
        <p class="mb-1 text-description-color text-sm leading-5 ">This is a description. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>

        <!-- Button -->
        <h1 class="text-xl font-semibold text-heading-color">Button</h1>
        <div class="flex gap-4">
            <button class="text-white text-sm font-medium border rounded px-3 py-1 bg-primary border-primary hover:bg-primary-bold hover:text-white ">Primary</button>
            <button class="text-white text-sm font-medium border rounded px-3 py-1 bg-success border-success hover:bg-success-hover hover:text-white ">Success</button>
            <button class="text-white text-sm font-medium border rounded px-3 py-1 bg-danger border-danger hover:bg-danger-hover hover:text-white ">Danger</button>
            <button class="text-white text-sm font-medium border rounded px-3 py-1 bg-warning border-warning hover:bg-warning-hover hover:text-white ">Warning</button>
            <button class="text-white text-sm font-medium border rounded px-3 py-1 bg-info border-info hover:bg-info-hover hover:text-white ">Info</button>

        </div>

        <!-- Outline Button -->
        <h1 class="text-xl font-semibold text-heading-color"> Outline Button</h1>
        <div class="flex gap-4">
            <button class="text-primary text-sm font-medium border rounded px-3 py-1 bg-white border-primary hover:bg-primary hover:text-white ">Primary</button>
            <button class="text-success text-sm font-medium border rounded px-3 py-1 bg-white border-success hover:bg-success hover:text-white ">Success</button>
            <button class="text-danger text-sm font-medium border rounded px-3 py-1 bg-white border-danger hover:bg-danger hover:text-white ">Danger</button>
            <button class="text-warning text-sm font-medium border rounded px-3 py-1 bg-white border-warning hover:bg-warning hover:text-white ">Warning</button>
            <button class="text-info text-sm font-medium border rounded px-3 py-1 bg-white border-info hover:bg-info hover:text-white ">Info</button>

        </div>

    </div>
  </div>
</template>

