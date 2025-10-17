<template>
  <section class="space-y-6">
    <Carousel />
    <MovieGenreCardList />
    <MoviePopularCardList />
    <MovieLatestCardList />
  </section>
</template>

<script lang="ts" setup>
// Case 1:
// Input: "()"
// Output: true

// Case 2:
// Input: "()[]{}"
// Output: true

// Case 3:
// Input: "(]"
// Output: false

// Case 4:
// Input: "([])"
// Output: true

// Case 5:
// Input: "([)]"
// Output: false

const pairsInput = (value: string) => {
  let data = []

  const pairs = {
    ')': '(',
    ']': '[',
    '}': '{'
  }

  for (const char of value) {
    if (['(', '[', '{'].includes(char)) {
      data.push(char)
    } else if ([')', ']', '}'].includes(char)) {
      const x = data.pop()

      if (x !== pairs[char]) return false
    }
  }

  return data.length === 0
}

onMounted(() => {
  console.log('soal 1', pairsInput('()')) //1 true
  console.log('soal 2', pairsInput('()[]{}')) // 2 true
  console.log('soal 3', pairsInput('(]')) // 2 false
})
</script>

<style></style>
