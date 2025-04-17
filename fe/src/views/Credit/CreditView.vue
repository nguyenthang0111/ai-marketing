<template>
  <div class="p-10">
    <div class="mb-10 flex justify-between">
      <div>
        <span class="text-2xl font-bold">Credits</span>
      </div>
      <div>
        <button class="text-sm  font-medium text-gray-900 bg-white rounded-xl border border-primary hover:text-white hover:bg-primary px-5 py-2 flex justify-center items-center gap-1">
            <span class="icon-[mdi--plus]"></span>
            Sử dụng mã khuyến mãi
        </button>
      </div>
    </div>

    <!-- Credit History --> 
    <div class="relative overflow-x-auto">
        <table class="w-full text-sm font-medium text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        STT
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Trạng thái
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Credit tối đa
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Credit đã sử dụng
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Ngày bắt đầu
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Ngày kết thúc 
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       1
                    </th>
                    <td class="px-6 py-4">
                        <span class="text-success bg-success-light border border-success-clarity px-2 py-[5px] rounded-md">Kích hoạt</span>
                    </td>
                    <td class="px-6 py-4">
                        50
                    </td>
                    <td class="px-6 py-4">
                        3
                    </td>
                    <td class="px-6 py-4">
                        1/1/2024
                    </td>
                    <td class="px-6 py-4">
                        1/1/2025
                    </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        2
                    </th>
                    <td class="px-6 py-4">
                      <span class="text-danger bg-danger-light border border-danger-clarity px-2 py-[5px] rounded-md">Hết hạn</span>
                    </td>
                    <td class="px-6 py-4">
                        1000
                    </td>
                    <td class="px-6 py-4">
                        0
                    </td>
                    <td class="px-6 py-4">
                      1/1/2024
                    </td>
                    <td class="px-6 py-4">
                      1/1/2026
                    </td>
                </tr>
                <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        2
                    </th>
                    <td class="px-6 py-4">
                      <span class="text-warning bg-warning-light border border-warning-clarity px-2 py-[5px] rounded-md">Đang xử lí</span>
                    </td>
                    <td class="px-6 py-4">
                        9999999
                    </td>
                    <td class="px-6 py-4">
                        0
                    </td>
                    <td class="px-6 py-4">
                        1/1/2024
                    </td>
                    <td class="px-6 py-4">
                        1/1/2026
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

  </div>
</template>

<style>

</style>
