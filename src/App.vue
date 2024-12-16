<script setup>
const routes = {
    "#": {
        component: Accueil,
        label: "Accueil",
    },
    "#accueil": {
        component: Accueil,
        label: "Accueil",
    }
};

const currentPath = ref(window.location.hash);
const infoSupp = ref(false);
const currentPathId = ref();
updateCurrentPath();

function updateCurrentPath() {
    const path = window.location.hash;
    const hashs = path.split("-");
    const hashSection = hashs[0];
    const hashId = hashs[1];
    currentPath.value = routes[hashSection] ? hashSection : "#";
    currentPathId.value = hashId;

    // Redirection si l'utilisateur n'est pas connecté
    if (!localStorage.getItem("userId") && currentPath.value == "#account") {
        currentPath.value = "#login";
    }
    // Redirection si l'utilisateur est connecté
    if (localStorage.getItem("userId") && currentPath.value == "#login") {
        currentPath.value = "#account";
    }
}

window.addEventListener("hashchange", updateCurrentPath);
const toggleInfoSupp = () => {
    infoSupp.value = !infoSupp.value;
};
const currentView = computed(() => {
    return routes[currentPath.value].component;
});
</script>

<template>
 <section>
  <component :is="currentView" :Id="currentPathId" />
 </section>
</template>

<style scoped>

</style>
