---
slug: ai-evals-before-prompt-tuning
title: "Build AI Evals Before You Fine-Tune Prompts"
metaTitle: "A Practical AI Evaluation System for Product Teams"
description: A practical system for turning real AI product failures into an evaluation dataset, calibrated graders, regression gates, and production monitoring before prompt tuning.
metaDescription: Build useful AI product evals from real failures with a small dataset, clear rubrics, calibrated graders, regression gates, and production feedback loops.
author: Renowa Labs Engineering
publishedAt: 2026-05-28
updatedAt: 2026-07-22
category: AI Product Engineering
tags:
  - AI Evals
  - LLM Products
  - Product Engineering
  - Quality
relatedProduct:
coverImage: /engineering/covers/ai-evals.webp
canonicalUrl: https://www.renowa-labs.com/engineering/ai-evals-before-prompt-tuning
indexable: true
status: published
---

Prompt tuning without evaluation is product development by memory. A team sees a bad output, adds a sentence to the prompt, tries three friendly examples, and ships. The output that triggered the change may improve while another customer workflow quietly gets worse.

An evaluation system does not need hundreds of examples or an expensive platform to be useful. It needs representative tasks, explicit failure definitions, repeatable execution, and human judgment against which automated graders can be checked.

## Begin with observed failures

Collect 20 to 50 real or realistically reconstructed tasks from the product. Include successful cases, common cases, important edge cases, and incidents. Remove or protect personal and confidential data before using production traces.

For each example, record:

- the user goal and relevant input;
- permitted context and tools;
- the output or action that occurred;
- what a good result must accomplish;
- what made the result fail;
- severity if that failure reaches a user.

Hamel Husain’s practical writing on [why AI products need evals](https://hamelhusain.substack.com/p/evals) emphasizes examining real data and converting observed errors into tests. That order matters. An imagined benchmark can be perfectly measurable and still miss the failures affecting the product.

## Create a failure taxonomy before a score

A single “quality from one to five” score hides what to fix. Label failures in product terms. A support assistant might use:

- incorrect factual claim;
- missing required step;
- unsupported promise;
- wrong account or policy context;
- unsafe disclosure;
- unnecessary escalation;
- correct answer but unusable format.

An agentic workflow also needs process failures: wrong tool, invalid arguments, duplicated side effect, failure to stop, or completion claimed before evidence exists. Anthropic’s guide to [demystifying evaluations for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) separates the task, trial, grader, transcript, and outcome. That is a helpful mental model because a final answer can look plausible even when the process was expensive or unsafe.

Give every failure category a short definition and positive and negative examples. If two teammates cannot apply a label consistently, the category is not ready to automate.

## Use deterministic checks first

Many requirements do not need another model to judge them. Use code for:

- valid JSON or schema conformance;
- required and forbidden fields;
- exact values from a fixture;
- permitted tool names;
- maximum calls, latency, or cost;
- citation presence and URL validity;
- no write action in a read-only task;
- a database or sandbox reaching the expected state.

Deterministic checks are cheap, fast, and explainable. They also constrain a model grader to the dimensions that genuinely require judgment, such as helpfulness, completeness, or whether a citation supports a claim.

Do not test only the text when the product performs actions. The most reliable grader for “created the correct calendar event” is usually the resulting calendar state, not an AI’s opinion of the agent transcript.

## Make model graders narrow and calibrate them

Use binary or pairwise questions where possible: “Does the answer tell the user to rotate the exposed key?” is easier to apply than “How good is the security advice?” Require the grader to cite the exact evidence for its decision and allow an “insufficient information” outcome.

Then compare the grader with human labels on a held-out sample. Review false passes and false failures. A judge model can be biased toward longer answers, familiar phrasing, or outputs from the same model family. It can also accept a confident but unsupported statement.

Track agreement by failure category, not only overall. A grader that is excellent at format and poor at privacy should not control a privacy release gate. Keep high-severity security, legal, and financial cases under human review until evidence shows the automated check is dependable.

## Measure product trade-offs together

Quality is not the only outcome. A release that gains two accuracy points by tripling latency and cost may make the product worse. Capture at least:

- task success by category and severity;
- model and prompt version;
- latency distribution;
- input and output tokens or provider cost;
- tool-call count and error rate;
- abstention, escalation, or fallback rate.

Run the same dataset against the current and candidate configurations. Compare per example so regressions are visible rather than hidden inside an average. Set hard gates for critical safety and state-changing failures, while using a budget for lower-severity quality movement.

## Separate offline regression from online monitoring

Offline evals answer, “Should this change ship?” Production monitoring answers, “What is happening with real use?” They need a shared failure taxonomy but different data.

In production, sample outputs across customers, languages, features, and risk levels. Monitor deterministic signals such as tool errors, empty results, unusually long responses, high cost, and user corrections. Give users a way to report a concrete problem rather than only a thumbs-down.

Review samples on a schedule. Every repeated or severe production failure should become a sanitized offline test. Every obsolete test should be revised or removed. This creates the loop:

1. observe a real failure;
2. define it precisely;
3. add a test that reproduces it;
4. improve prompt, model, retrieval, tools, or product design;
5. verify no important behavior regressed;
6. monitor the result in production.

## Choose the right layer to fix

Not every AI failure is a prompt failure. Missing facts may require better retrieval or source freshness. A wrong action may require stricter tool permissions. Inconsistent structure may require constrained output. An unjudgeable task may indicate that the product has not defined success clearly.

Anthropic’s discussion of [building effective agents](https://www.anthropic.com/engineering/building-effective-agents) recommends beginning with the simplest solution and adding complexity only when it improves outcomes. Apply the same discipline to fixes. A longer system prompt is often less dependable than a smaller task, a verified data field, or a deterministic permission check.

## A one-week evaluation setup

Day one: review recent traces and support issues. Day two: create a failure taxonomy and label 25 examples. Day three: add deterministic graders and one narrow model rubric. Day four: run the current configuration and inspect grader disagreements. Day five: compare one proposed change on quality, latency, cost, and critical failures.

Store each run with the dataset version, code commit, model identifier, prompt version, and grader version. Keep the initial system small enough that the team will run and inspect it. A 30-case suite used on every meaningful change is more valuable than a 500-case pipeline everyone distrusts.

## Next steps

Choose one product workflow and collect ten recent successes and ten failures. Define three failure categories in plain language. Add deterministic checks for everything objective, then manually label the rest. Only after the baseline exists should the team tune the prompt and claim an improvement.

The purpose of evals is not to produce a dashboard with a high score. It is to make product changes falsifiable: the team can say what improved, what regressed, what it cost, and which important failures remain.
