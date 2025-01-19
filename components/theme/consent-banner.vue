<script setup>
// const gtm = useGtm();
const { message } = defineProps({
  message: {
    type: Object,
    default: {
      headline: "This website uses cookies",
      message:
        "Our website uses cookies to improve your browsing experience. By using our site you agree to the use of cookies.",
    },
  },
});
// Handle communication to App.vue
const emit = defineEmits(["acceptCookies", "rejectCookies"]);
const acceptCookies = () => {
  localStorage.setItem("cookiesAccepted", "true");
  emit("acceptCookies");
  showing.value = false;
};
const rejectCookies = () => {
  localStorage.setItem("cookiesAccepted", "false");
  emit("rejectCookies");
  showing.value = false;
};

// Props
const showing = ref(false);

const route = useRoute();
onMounted(() => {
  const accepted = localStorage.getItem("cookiesAccepted");
  const isPreview = route.query.preview || route.path.includes("preview");
  if (accepted != "true" && !isPreview) {
    showing.value = true;
  } else {
    // gtm.enable(true);
  }
});
</script>
<template>
  <transition name="slide-up">
    <section class="theme-consent-banner" v-if="showing" tabindex="-1">
      <div class="container">
        <div class="content">
          <p class="h2 title fs-16">{{ message.headline }}</p>
          <p class="text fs-15">{{ message.message }}</p>
        </div>
        <div class="buttons fs-14">
          <button class="button" @click="acceptCookies">Accept</button>
          <button class="button decline" @click="rejectCookies">Decline</button>
        </div>
      </div>
    </section>
  </transition>
</template>

<style lang="scss">
@use "@/assets/styles/variables/breakpoints" as *;

.theme-consent-banner {
  background-color: white;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  z-index: 999999;
  width: 100%;
  border-top: 1px solid #dedede;
  padding: 3rem 0;

  .container {
    display: flex;
    gap: 1.75rem;
    justify-content: space-between;

    .content {
      .title {
        font-weight: 900;
        line-height: 1.75;
      }
      .text {
        leading-trim: both;
        text-edge: cap;
        font-weight: 465;
        line-height: 1.6; /* 160% */
        letter-spacing: 0.3px;
      }
    }

    .buttons {
      display: flex;
      gap: 1.333rem;
      justify-content: flex-end;
      button {
        padding: 1.333rem 2rem;
        background: red;
        font-weight: 400;
        letter-spacing: 0.84px;
        transition: 300ms ease;
        border: 1px solid transparent;

        &.decline {
          background: #dedede;
        }

        &:hover,
        &:active {
          //  letter-spacing: 1.3px;
          border: 1px solid black;
        }
      }
    }
  }

  @media (max-width: $tablet) {
    .container {
      flex-direction: column;
      gap: 1.5rem;

      .buttons {
        width: 100%;
        justify-content: flex-start;
      }
    }
  }
}

// Animation
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 400ms ease-in-out;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
.slide-up-enter-to,
.slide-up-leave {
  transform: translateY(0);
}
</style>
