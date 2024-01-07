import { createApp } from "vue";
import App from "./App.vue";
import Toast from "./components/toast/Toast.vue";
import Modal from "./components/Modal.vue";
import icons from "./components/icons/all";

const app = createApp(App);

// Register all icons
for (const [key, value] of Object.entries(icons)) {
  app.component(key, value);
}

app.component("app-toast", Toast);
app.component("app-modal", Modal);

app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});

app.mount("#app");
