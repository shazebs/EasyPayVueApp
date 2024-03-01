<template>
    <div class="body">
        <h1>{{ title }}</h1>

        <h2>CST-326-O500</h2>
        <div align="left">
            <h3>Topic 1: Introduction to Agiile Project Management</h3>
            <blockquote class="assignment" >
                <h4>Key Considerations</h4>
                Answer the following questions in 250-300 words each.
                <ol>
                    <li>What is the purpose of Scrum?</li>
                    <li>What are the key considerations necessary to successfully complete a project using Agile project management?</li>
                    <li>How are Agile-based tools and a Git repository used to manage Scrum?</li>
                </ol>
            </blockquote>

            <h3>Topic 2: User Story and Team Charter Development</h3>
            <blockquote class="assignment">
                <h4>CLC - Milestone 1: Team Charter and User Stories Document</h4>
                Part 1: Team Charter
                <ol>
                    <li>Title</li>
                    <li>Team members and their responsibilities</li>
                </ol>
            </blockquote>
        </div>
    </div>

    <div style="padding:2%; border-top:2px dashed black;">
        <h2>MMU Write-up</h2>
        <section style="text-align:left;">
            <ol>
                <li>Discuss how the MMU supports translating virtual address to real physical address:
                    <blockquote><b>Answer: </b>The MMU uses a mapping technique to translate virtual memory addresses into physical memory addresses. To achieve this, a computer program is organized into a table containing chunks of memory addresses with each chunk referred to as a "virtual page". The MMU then maps these virtual pages to chunks of physical memory addresses referred to as "page frames". The idea is that large computer programs can partially load into small physical memory spaces and once the program requires access to memory spaces beyond what is mapped, the MMU will swap out chunks of memory that are less used to non-volatile storage and keep the program functional.</blockquote>
                </li>
                <li>Discuss how an MMU is used in an operating system:
                    <blockquote><b>Answer: </b>An MMU is a component placed within the CPU package, but not the CPU itself. The MMU receives virtual addresses from the CPU and then runs its function of translating virtual addresses into physical memory address. These translation are then sent to the memory component which is responsible for mapping physical memory addresses.</blockquote>
                </li>
                <li>Write the pseudocode logic to support how the MMU translates and maps addresses:
                    <blockquote><b>Answer: </b></blockquote>
                </li>
            </ol>
        </section>
    </div>
</template>

<script>
export default {
    name: 'GCU',
    data() {
        return {
            title: 'GCU',
        }
    },
    methods: {

    }
}
</script>

<style scoped>
    .assignment {
        border: 2px dashed black;
        border-radius:12px;
        padding:12px;
    }
    div.body {
        border-top:2px dashed black;
    }
    ol {
        line-height:1.75;
    }
</style>
