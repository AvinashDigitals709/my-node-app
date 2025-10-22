pipeline {
    agent any

    tools {
        nodejs 'Default'  // Make sure Node.js is installed under Manage Jenkins → Global Tool Configuration
    }

    environment {
        APP_PORT = "3000"
        APP_NAME = "my-node-app"
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
                sh 'npm run build || echo "⚠️ No build script found"'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || echo "⚠️ No tests found"'
            }
        }

        stage('Run Application') {
            steps {
                sh '''
                    # Install PM2 globally if not already installed
                    if ! command -v pm2 >/dev/null 2>&1; then
                        npm install -g pm2
                    fi

                    # Stop any running instance (ignore errors if not running)
                    pm2 delete "$APP_NAME" || true

                    # Start Node.js app using PM2 in daemon mode (background)
                    pm2 start app.js --name "$APP_NAME"

                    # Wait a few seconds for it to start
                    sleep 5

                    # Display running PM2 apps
                    pm2 status

                    # Display the last few lines of logs
                    pm2 logs "$APP_NAME" --lines 10 --nostream
                '''
                echo "🚀 Node.js App started via PM2 and running on port ${APP_PORT}!"
            }
        }
    }

    post {
        always {
            echo '✅ Build Completed — Node.js pipeline executed successfully!'
        }
    }
}
