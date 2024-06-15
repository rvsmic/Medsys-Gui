<template>
  <div class="loader-bg">
    <div class="loader" />
  </div>
</template>

<style>
.loader-bg {
  display: flex;
  position: absolute;
  top: 9rem;
  left: 0;
  width: 100vw;
  height: calc(100vh - 9rem);
  z-index: 8;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  backdrop-filter: saturate(180%) blur(10px);
}
.loader {
  margin: 0 auto;
  margin-bottom: 150px;
  padding-right: 35px;
  padding-left: 5px;
  height: 10px;
  aspect-ratio: 8;
  display: grid;
}
.loader:before,
.loader:after {
  content: '';
  grid-area: 1/1;
  --_g: no-repeat radial-gradient(farthest-side, #42841f 94%, #0000);
  background:
    var(--_g) left,
    var(--_g) right;
  background-size: 25% 100%;
  animation: l34 1s infinite;
  transform: translate(var(--d, 0)) rotate(0);
}
@media (prefers-color-scheme: dark) {
  .loader:before,
  .loader:after {
    content: '';
    grid-area: 1/1;
    --_g: no-repeat radial-gradient(farthest-side, #5ed122 94%, #0000);
    background:
      var(--_g) left,
      var(--_g) right;
    background-size: 25% 100%;
    animation: l34 1s infinite;
    transform: translate(var(--d, 0)) rotate(0);
  }

  .loader-bg {
  display: flex;
  position: absolute;
  top: 9rem;
  left: 0;
  width: 100vw;
  height: calc(100vh - 9rem);
  z-index: 8;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  backdrop-filter: saturate(180%) blur(10px);
}
}
.loader:after {
  --d: 37.5%;
  animation-delay: 0.5s;
}
@keyframes l34 {
  50%,
  100% {
    transform: translate(var(--d, 0)) rotate(0.5turn);
  }
}
</style>
