import bus from "nuxt-bus";

export default defineNuxtPlugin(() => {
	return {
		provide: {
			bus,
		},
	};
});
