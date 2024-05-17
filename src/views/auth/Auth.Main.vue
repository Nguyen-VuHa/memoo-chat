<script setup>
import DashboardLight from '@/assets/images/dashboard-light.svg'
import Logo from '@/assets/images/logo.svg'
</script>

<template>
    <div class="min-h-[100vh] flex grow bg-slate-50 dark:bg-navy-900">
        <div class="fixed top-0 hidden p-6 lg:block lg:px-12">
            <a href="#" class="flex items-center space-x-2">
                <img class="h-12 w-12" :src="Logo" alt="logo" /> 
                <p
                    class="text-xl font-semibold uppercase text-slate-700 dark:text-navy-100"
                >
                    MeMoo
                </p>
            </a>
        </div>
        <div class="hidden w-full place-items-center lg:grid">
            <div class="w-full max-w-lg p-6">
                <img
                    class="w-full"
                    id="hero-image-light"
                    :src="DashboardLight"
                    alt="image"
                />
            </div>
        </div>
        <RouterView /> 
    </div>
</template>