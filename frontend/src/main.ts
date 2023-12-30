import { createApp } from "vue";
import "@/index.css";
import App from "@/App.vue";
const app = createApp(App);

// router
import { router } from "@/router";
app.use(router);

// pinia
import { createPinia } from "pinia";
const pinia = createPinia();
app.use(pinia);

// vue-toastification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
app.use(Toast);

// font-awesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
app.component("font-awesome-icon", FontAwesomeIcon);
library.add(faArrowUpFromBracket);

// vue-final-modal
import { createVfm } from "vue-final-modal";
import "vue-final-modal/style.css";
const vfm = createVfm();
app.use(vfm);

app.mount("#app");
