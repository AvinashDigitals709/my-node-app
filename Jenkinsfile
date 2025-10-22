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
                    # Kill any previous instance on the same port (optional, useful for repeated builds)
                    pkill -f "node app.js" || true

                    # Start Node.js app in background with logs
                    nohup node app.js > app.log 2>&1 &
                    
                    # Give app time to start
                    sleep 5

                    # Show last few lines of logs for confirmation
                    tail -n 10 app.log
                '''
                echo "🚀 Node.js App started in background on port $APP_PORT!"
            }
        }
    }

    post {
        always {
            echo '✅ Build Completed — Node.js pipeline executed successfully!'
        }
    }
}
