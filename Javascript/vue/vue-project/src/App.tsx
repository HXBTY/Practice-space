import { defineComponent } from "vue";
import { RouterLink, RouterView } from "vue-router"

export default defineComponent({
    setup() {
        return () => (
            <>
               <div class="routerLink">
                   <RouterLink to="/">Home</RouterLink>
               </div>
                <RouterView />
            </>
        )
    }
})