#!/usr/bin/env groovy
node {
  def project = 'sosid'

  def appName = 'application'
  def project_id = "${project}-success"
  def image = "gcr.io/${project_id}/${appName}"
  def imageTag = "${image}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

  checkout scm

  stage 'Build image'
  sh("cd web && npm install && grunt --force")
  sh("docker build -t ${imageTag} .")

  withCredentials([file(credentialsId: "${project}", variable: 'key')]) {
    withEnv(["GOOGLE_APPLICATION_CREDENTIALS=${key}"]) {
      sh("gcloud auth activate-service-account --key-file ${key} --project=${project_id}")
      sh("gcloud container clusters get-credentials ${project} --zone europe-west1-b")

      stage('Push image to registry') {
        sh("gcloud docker -- push ${imageTag}")
      }
      stage('Deploy Application') {
        switch (env.BRANCH_NAME) {
        case "master":
          sh("sed -i.bak 's|##image##|${imageTag}|' ./k8s/application-deploy.yml")
          sh("kubectl -n production apply -f k8s/application-deploy.yml")
        }
      }
    }
  }
}
