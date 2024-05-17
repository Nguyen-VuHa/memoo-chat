<script setup></script>


<template>
        <form class="ml-0 border-t-2 flex items-center absolute px-2 shadow-lg w-full bottom-0 left-0 h-[60px] bg-[white]" >
            <div className='absolute flex justify-center items-center space-x-2 top-[-55%] bg-white py-1 px-3 rounded-lg text-sm'>
                <span className='text-[#9E9EA1]'>Nguyễn Vũ Hạ</span>
                <div className='typing-status'>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <input
                type="text"
                className="form-input pl-5 outline-none h-9 w-full bg-transparent placeholder:text-slate-400/70"
                placeholder="Nhắn gì đó cho ..."
            />
            <button
                className="btn outline-none flex justify-center items-center h-9 w-9 shrink-0 rounded-full p-0 text-primary hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25"
                type='submit'
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5.5 w-5.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.813 5.146 9.027 3.99c4.05 1.79 4.05 4.718 0 6.508l-9.027 3.99c-6.074 2.686-8.553.485-5.515-4.876l.917-1.613c.232-.41.232-1.09 0-1.5l-.917-1.623C1.26 4.66 3.749 2.46 9.813 5.146ZM6.094 12.389h7.341"
                    />
                </svg>
            </button>
        </form>
</template>