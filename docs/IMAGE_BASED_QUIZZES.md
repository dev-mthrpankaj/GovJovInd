# Image Based Quiz Template

Use `JS/quiz-data/templates/image-based-50-question-template.js` as the starting point for any new image-based paper. The template contains 50 question records and is not registered on the live Quiz page.

## Create A New Paper

1. Copy the template into the relevant subject folder, for example:

   `JS/quiz-data/reasoning/reasoning-figure-set-1.js`

2. In the copied file, update:

   - `quizId`
   - `IMAGE_BASE_PATH`
   - quiz title, description, subject, difficulty and tags
   - all 50 `question`, `explanation` and `correctAnswer` values

3. Create the image folder:

   `Assets/Quiz/reasoning-figure-set-1/`

4. Add images using this naming format:

   ```text
   q01-question.webp
   q01-option-a.webp
   q01-option-b.webp
   q01-option-c.webp
   q01-option-d.webp
   q01-explanation.webp
   ```

   Repeat the same pattern through `q50-...`.

5. Only after the paper and images are complete, add the quiz to the matching subject section in `JS/quiz-registry.js`:

   ```js
   quizMeta(
       "reasoning-figure-set-1",
       "Reasoning",
       "Reasoning Image Based Practice Set 1",
       "50 image-based reasoning questions with answer explanations.",
       "Hard",
       "quiz-data/reasoning/reasoning-figure-set-1.js"
   ),
   ```

## Answer Numbering

`correctAnswer` uses zero-based numbering:

```text
0 = A
1 = B
2 = C
3 = D
```

## Text Options Instead Of Option Images

For a question that has one main figure but text-only choices, add an `options` field inside that question definition:

```js
{
    topic: "Direction Test",
    difficulty: "medium",
    question: "Study the figure and choose the correct direction.",
    options: ["North", "South", "East", "West"],
    correctAnswer: 2,
    explanation: "The final direction is East."
}
```

The question image and explanation image will still use the standard filenames.

## Image Guidance

- Prefer `.webp` for smaller downloads; `.png` is suitable for diagrams requiring sharp text.
- Keep text inside diagrams large enough to read on a phone screen.
- Use descriptive `imageAlt` and `explanationImageAlt` text when overriding the default paths.
- Keep the template out of `JS/quiz-registry.js`; register only finished papers.
