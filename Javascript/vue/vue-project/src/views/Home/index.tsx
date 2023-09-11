import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import myRoute from "@/router";

export default defineComponent({
    setup() {
        const routes: ref<RouterRecod[]> = ref(myRoute.getRoutes())
        return () => (
            <>
                <div class="routerLink">
                    {
                        routes.value.map(route => (
                            <RouterLink to={ route.path } key={ route.path }>{ route.name }--</RouterLink>
                        ))
                    }
                </div>
            </>
        )
    }
})