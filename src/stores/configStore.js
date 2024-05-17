import { defineStore } from "pinia"


export const useConfigStore = defineStore({ 
    id: 'system-config',
    state:() => ({
        isToggleSideBar: false,
        isDarkMode: false,
        windowSize: window.innerWidth,

        menus: [],
    }),
    actions: {
        
    }
})