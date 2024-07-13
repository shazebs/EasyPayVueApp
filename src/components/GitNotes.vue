<template>
    <div id="git-notes-ui">
        <h2>Welcome to Git Notes!</h2>
        <div v-for="(concept, index) in Concepts" :key="index">

            <u>{{ concept.name }}</u> <br/>
            {{ concept.description }} <br/><br/>

        </div>
    </div>
</template>

<script>

export default 
{
    name: 'GitNotes',

    data() {
        return {
            Concepts: [
                {
                    name: 'Repository (Repo)',
                    description: 'A repository is a storage space where your project resides. It contains all the files, along with the entire history of changes made to those files.'
                },
                {
                    name: 'Commit',
                    description: 'A commit is a snapshot of your repository at a specific point in time. Every time you commit, you save the state of your project.'
                },
                {
                    name: 'Branch',
                    description: 'Branches allow you to diverge from the main line of development to work on different features, bug fixes, or experiments without affecting the main project. The \'master\' or main \'branch\' is the default branch.'
                },
                {
                    name: 'Merge',
                    description: 'Merging is the process of combining the changes from different branches back into a single branch. This is usually done when a feature is complete and ready to be integrated into the main branch.'
                },
                {
                    name: 'Clone',
                    description: 'Cloning is the process of creating a copy of an existing repository. This is useful when you want to start working on a project that is hosted in a remote repository.'
                },
                {
                    name: 'Pull',
                    description: 'Pulling means fetching changes from a remote repository and merging them into your current branch. This keeps your local repository up to date with the latest changes from others.'
                },
                {
                    name: 'Push',
                    description: 'Pushing is the process of sending your commits to a remote repository. This makes your changes available to others.'
                },
                {
                    name: 'Remote',
                    description: 'A remote is a version of your repository that is hosted on the internet or another network. GitHub, GitLab, and Bitbucket are popular hosting services for Git repositories.'
                },
            ],
        }
    },

    created()
    {

    },

    mounted()
    {

    },

    methods: 
    {

    }
}
</script>

<style scoped>

#git-notes-ui
{
    padding: 0px 10px;
}

</style>