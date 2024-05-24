import { defineStore } from "pinia"


export const useConfigStore = defineStore({ 
    id: 'system-config',
    state:() => ({
        isToggleSideBar: window.innerWidth <= 680 ? true :  false,
        isToggleSearhBar: false,
        isDarkMode: false,
        isClosedConnect: false,
        windowSize: window.innerWidth,

        menus: [],
    }),
    actions: {
        
    }
})