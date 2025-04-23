pipeline {
    agent any

    environment {
        TARGET_HOST = '10.100.60.110'
        TARGET_DIR = '/home/project/react/phoneme-portal'
        BRANCH = 'main'
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: "${env.BRANCH}", url: 'https://github.com/myphoneme/phoneme-portal.git'
            }
        }

        stage('Build React') {
            steps {
                sh '''
                    npm install
                    npm run build
                '''
            }
        }

        stage('Deploy to Server') {
            steps {
                sshagent(credentials: ['phoneme-ssh']) {
                    sh '''
                        rsync -avz --delete -e "ssh -o StrictHostKeyChecking=no" build/ root@${TARGET_HOST}:${TARGET_DIR}
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Done to ${TARGET_HOST}"
        }
        failure {
            echo "❌ Build/Deploy failed!"
        }
    }
}