import { createApp } from 'vue'
import App from './App.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import colors from 'vuetify/lib/util/colors'

// I'll use Vuetify to get a Material design -> https://next.vuetifyjs.com/en/
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: colors.red.darken1, // For Maplr color !
                }
            },
        },
    },
})

createApp(App).use(vuetify).mount('#app')
