<script lang="ts">
  import MyProfileBadge from "./MyProfileBadge.svelte";
  import {agent} from "$lib/stores";
  import {page} from "$app/stores";
  import SideMyFeeds from "$lib/components/side/SideMyFeeds.svelte";

  let isFeedsModalOpen = false;
</script>

<footer class="footer">
  <div class="footer__wrap">
    <div class="footer__item">
      {#if $page.url.pathname !== '/'}
        <a
            class="side-bar-button"
            href="/"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-color-1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </a>
      {:else}
        <button
            class="side-bar-button"
            on:click={() => {isFeedsModalOpen = !isFeedsModalOpen}}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-color-1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gantt-chart-square"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 8h7"/><path d="M8 12h6"/><path d="M11 16h5"/></svg>
        </button>
      {/if}
    </div>

    <div class="footer__item">
      <a href="/search">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-color-1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </a>
    </div>

    <div class="footer__item footer__me">
      {#if ($agent)}
        <MyProfileBadge handle={$agent.handle()}></MyProfileBadge>
      {/if}
    </div>

    <div class="footer__item">
      <a href="/notification">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-color-1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
      </a>
    </div>

    <div class="footer__item"></div>
  </div>
</footer>

{#if isFeedsModalOpen}
  <div class="footer-feeds-modal">
    <div class="footer-feeds-modal__content">
      <SideMyFeeds on:close={() => {isFeedsModalOpen = false}}></SideMyFeeds>
    </div>

    <button class="footer-feeds-modal__close" on:click={() => {isFeedsModalOpen = false}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-circle"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
    </button>
  </div>
{/if}

<div class="footer-round"></div>

<style lang="postcss">
  .footer {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 10px 10px 0 0;
      box-shadow: 0 -1px 6px rgba(61, 120, 209, .09);
      background-color: var(--bg-color-1);
      z-index: 1001;

      @media (min-width: 767px) {
          display: none;
      }

      &::before {
          content: '';
          display: block;
          position: absolute;
          right: 20px;
          top: 16px;
          bottom: 0;
          background-color: var(--base-bg-color);
          width: 52px;
      }

      &__wrap {
          display: flex;
          align-items: center;
          padding: 0 40px 0 20px;
          height: 60px;
          justify-content: space-between;
      }

      &__item {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
      }
  }

  .footer-round {
      position: fixed;
      width: 70px;
      height: 70px;
      background-color: var(--bg-color-1);
      border-radius: 50%;
      right: 11px;
      bottom: 11px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
      z-index: 11;

      @media (min-width: 767px) {
          display: none;
      }
  }

  .footer-feeds-modal {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      background-color: rgba(0, 0, 0, .5);
      backdrop-filter: blur(8px);
      height: calc(100vh);
      overscroll-behavior-y: none;
      overflow-y: auto;
      z-index: 9999;

      &__content {
          position: fixed;
          bottom: 80px;
          box-shadow: 0 0 10px var(--box-shadow-color-1);
          border-radius: var(--border-radius-3);
          height: calc(100vh - 100px);
          overscroll-behavior-y: none;
          left: 16px;
          right: 16px;
          background-color: var(--bg-color-1);
          overflow-y: auto;
      }

      &__close {
          position: absolute;
          bottom: 24px;
          width: 36px;
          height: 36px;
          left: 0;
          right: 0;
          margin: auto;
      }
  }
</style>