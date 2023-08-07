pipeline {
    agent {
        docker {
            image 'your-dockerhub-username/cypress-tests:latest'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Clone repository') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: '']]])
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run tests') {
            steps {
                  // Run Cypress tests headlessly
                sh 'npm test'
            }
        }
    }
}
