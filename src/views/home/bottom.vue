<script setup lang="ts">
</script>

<template>
  <div class="text-7">
    <span class="text-primary">Projects</span>
    <div class="grid grid-cols-1 m-t-2 grid-gap-2 md:grid-cols-2">
      <Tagi title="Bilibili Fans Card" icon="i-ri:bilibili-line" desc="A tool making bilibili fans card." href="https://bilibili-fans.keke.cc/" />
      <Tagi title="Bilibili SuperChat" icon="i-ri:bilibili-line" desc="Generate custom SuperChat image." href="https://sc.keke.cc/" />
      <Tagi icon="i-ri:hashtag" desc="Custom Visitor Badge." href="https://github.com/Bernankez/visitor-badge">
        <Image class="h-12 text-10" src="https://badge.keke.cc/api/keke.cc/bernankez" alt="visitor badge">
          <div class="i-svg-spinners:3-dots-scale h-12 text-6"></div>
        </Image>
      </Tagi>
      <Tagi title="Snippets" icon="i-ph:intersect" desc="Just snippets." status="outdated" href="https://snippets.keke.cc/" />
      <Tagi title="Prototype" icon="i-ri:flask-line" desc="Collection of prototypes." status="outdated" href="https://prototype.keke.cc/" />
      <Tagi title="Password Generator" icon="i-ri:key-line" desc="Password generator." status="archived" href="https://pwgen.keke.cc/" />
      <Tagi title="Theme Generator" icon="i-ph:rainbow" desc="Website theme generator." href="https://theme-generator.keke.cc/" />
    </div>
  </div>
  <div class="text-7">
    <span class="text-primary">Libraries</span>
    <div class="grid grid-cols-1 m-t-2 grid-gap-2 md:grid-cols-2">
      <Tagi title="vite-plugin-font-carrier" icon="i-ri:font-family" desc="Compress your font asset on demand using font-carrier." status="outdated" href="https://github.com/Bernankez/vite-plugin-font-carrier" />
      <Tagi title="Backmoji" icon="i-ph:paw-print" desc="A library for creating patterns quickly and easily." status="experimental" href="https://backmoji.keke.cc/" />
      <Tagi title="git-sync" icon="i-ri:git-branch-line" desc="Auto sync repos when pushing to git." href="https://github.com/Bernankez/git-sync" />
      <Tagi title="npm-open" icon="i-ri:npmjs-line" desc="Open npm package homepage with `npm-open`." href="https://github.com/Bernankez/npm-open" />
      <Tagi title="create-l" icon="i-ri:add-box-line" desc="TypeScript library scaffold." href="https://create-l.keke.cc/" />
      <Tagi title="@bernankez/utils" icon="i-ph:package" desc="Using utils out-of-the-box" href="https://utils.keke.cc/" />
    </div>
  </div>
  <div class="text-7">
    <span class="text-primary">Presets</span>
    <div class="grid grid-cols-1 m-t-2 grid-gap-2 md:grid-cols-2">
      <Tagi title="vscode-settings" icon="i-simple-icons:visualstudiocode" desc="My VSCode settings." href="https://github.com/Bernankez/vscode-settings" />
      <Tagi title="eslint-config" icon="i-simple-icons:eslint" desc="My ESLint config presets." href="https://eslint.keke.cc/" />
      <Tagi title="stylelint-config (Outdated)" icon="i-simple-icons:stylelint" desc="My Stylelint config presets." status="deprecated" href="https://github.com/Bernankez/stylelint-config" />
    </div>
  </div>
</template>
