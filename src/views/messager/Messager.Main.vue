<script setup>
import MessagerContent from './MessagerContent.vue';
import MessagerHeader from './MessagerHeader.vue';
import MessagerSideBar from './MessagerSideBar.vue';

</script>

<template>
   <div class="flex w-full h-full">
      <MessagerSideBar />
      <div class="w-full h-full flex flex-col relative">
         <MessagerHeader />
         <MessagerContent />
      </div>
   </div>
</template>