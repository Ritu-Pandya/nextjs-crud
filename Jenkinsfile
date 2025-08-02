pipeline {
    agent any

    tools {
        nodejs 'Node 22'
    }

    environment {
        CI = 'false' // React default, disable strict CI
    }

    stages {
        stage('Clone Repo') {
            steps {
                git url: 'https://github.com/Ritu-Pandya/nextjs-crud.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Vercel') {
            steps {
                withCredentials([string(credentialsId: 'vercel-token', variable: 'VERCEL_TOKEN')]) {
                    sh '''
                        npm install -g vercel
                        vercel --token=$VERCEL_TOKEN --prod --confirm
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ React app deployed to Vercel!"
        }
        failure {
            echo "❌ Deployment failed."
        }
    }
}