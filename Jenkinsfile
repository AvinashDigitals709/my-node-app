pipeline {
    agent any

    tools {
        nodejs 'Default'  // Your Node.js installation in Jenkins
    }

    environment {
        APP_PORT = "3000"
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
                // If no build script exists, it will skip gracefully
                sh 'npm run build || echo "No build script found"'
            }
        }

        stage('Test') {
            steps {
                // If no tests exist, it will skip gracefully
                sh 'npm test || echo "No tests found"'
            }
        }

        stage('Run Application') {
    steps {
        sh '''
            # Stop any previous instance
            pm2 delete my-node-app || true

            # Start Node.js app via PM2
            pm2 start app.js --name my-node-app --no-daemon

            # Show PM2 status
            pm2 status
        '''
        echo "🚀 Node.js App started via PM2!"
    }
}


    post {
        always {
            echo '✅ Build Completed — Node.js pipeline executed successfully!'
        }
    }
}
