<template>
  <el-config-provider :size="app.theme.size.value">
    <router-view />
    <teleport to="body">
      <z-reply />
    </teleport>
  </el-config-provider>
</template>