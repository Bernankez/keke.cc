<script setup lang="ts">
</script>

<template>
  <div class="text-7">
    <span class="text-primary">Projects</span>
    <div class="grid grid-cols-1 m-t-2 grid-gap-2 md:grid-cols-2">
      <Tagi title="Bilibili Fans Card" icon="i-ri:bilibili-fill" desc="A tool making bilibili fans card." href="https://bilibili-fans.keke.cc/" />
      <Tagi title="Bilibili SuperChat" icon="i-ri:bilibili-fill" desc="Generate custom SuperChat image." href="https://sc.keke.cc/" />
      <Tagi icon="i-mdi:counter" desc="Custom Visitor Badge." href="https://github.com/Bernankez/visitor-badge">
        <Image class="h-12 text-10" src="https://badge.keke.cc/api/keke.cc/bernankez" alt="visitor badge">
          <div class="i-svg-spinners:3-dots-scale h-12 text-6"></div>
        </Image>
      </Tagi>
      <Tagi title="Snippets" icon="i-mdi:vector-intersection" desc="Just snippets." href="https://snippets.keke.cc/" />
      <Tagi title="Prototype" icon="i-iconoir:emoji-think-left" desc="Collection of prototypes." href="https://prototype.keke.cc/" />
      <Tagi title="Password Generator" icon="i-solar:key-linear" desc="Password generator." href="https://pwgen.keke.cc/" />
    </div>
  </div>
  <div class="text-7">
    <span class="text-primary">Libraries</span>
    <div class="grid grid-cols-1 m-t-2 grid-gap-2 md:grid-cols-2">
      <Tagi title="vite-plugin-font-carrier" icon="i-radix-icons:font-family" desc="Compress your font asset on demand using font-carrier." href="https://github.com/Bernankez/vite-plugin-font-carrier" />
      <Tagi title="git-sync" icon="i-tabler:git-branch" desc="Auto sync repos when pushing to git." href="https://github.com/Bernankez/git-sync" />
      <Tagi title="create-l" icon="i-gridicons:create" desc="TypeScript library scaffold." href="https://github.com/Bernankez/create-l" />
      <Tagi title="@bernankez/utils" icon="i-ph:package" desc="Using utils out-of-the-box" href="https://utils.keke.cc/" />
    </div>
  </div>
  <div class="text-7">
    <span class="text-primary">Presets</span>
    <div class="grid grid-cols-1 m-t-2 grid-gap-2 md:grid-cols-2">
      <Tagi title="vscode-settings" icon="i-nonicons:vscode-16" desc="My VSCode settings." href="https://github.com/Bernankez/vscode-settings" />
      <Tagi title="eslint-config" icon="i-nonicons:eslint-16" desc="My ESLint config presets." href="https://eslint.keke.cc/" />
      <Tagi title="stylelint-config (Outdated)" icon="i-file-icons:stylelint" desc="My Stylelint config presets." href="https://github.com/Bernankez/stylelint-config" />
    </div>
  </div>
</template>
