<template>
  <el-config-provider size="large">
    <router-view />
    <teleport to="body">
      <z-reply />
    </teleport>
  </el-config-provider>
</template>