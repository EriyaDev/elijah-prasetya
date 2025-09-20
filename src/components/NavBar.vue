<script setup></script>

<template>
  <header class="top-0 z-50">
    <nav class="section-container navbar">
      <div class="logo">
        <div class="logo-text">ELIJAH PRASETYA</div>
      </div>

      <ul class="nav-link-container">
        <li><a href="#about">about</a></li>
        <li><a href="#explorations">explorations</a></li>
        <li><a href="#say hi!">say hi!</a></li>
      </ul>

      <div class="h-6 w-6 lg:hidden" onclick="showNav()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ECEEF0">
          <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
        </svg>
      </div>
    </nav>

    <div class="nav-mobile nav-hidden" id="nav-mobile">
      <ul>
        <li><a onclick="closeNav()" href="#about">about</a></li>
        <li><a onclick="closeNav()" href="#explorations">explorations</a></li>
        <li><a onclick="closeNav()" href="#say hi!">say hi!</a></li>
        <div class="mt-10 h-6 w-6 cursor-pointer" onclick="closeNav()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"
            ></path>
          </svg>
        </div>
      </ul>
    </div>
  </header>
</template>

<style scoped></style>
