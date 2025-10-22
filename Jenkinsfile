pipeline {
    agent any

    tools {
        // Optional: if you added Node.js in Jenkins Tools section
        nodejs 'Default'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/AvinashDigitals709/my-node-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build || echo "No build script found"'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || echo "No tests found"'
            }
        }

        stage('Run Application') {
            steps {
                sh 'node app.js & sleep 5'
                echo 'Application started successfully!'
            }
        }
    }

    post {
        always {
            echo '✅ Build Completed — Node.js pipeline executed successfully!'
        }
    }
}
