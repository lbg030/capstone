# 💻 Capstone Design  


## 💡 Introduction
1. Configure container cluster environment
	> Configure a Kubernetes cluster with a single node minikube
2. Serverless deployment
	> Install OpenFaas, Install operational monitoring tools
3. Build a data collection server
	> Configuration using public data API
4. Function Development
	> Configure serverless computing by developing OpenFaas-based function
  


## ⚙️  Setup
### DB password
### Deployment
`kubectl apply -f k8s`
### Ingress Nginx Controller
`minikube addons enable ingress`  
`minikube tunnel`  
`kubectl get pods -n ingress-nginx`


---
# 💻 캡스톤 디자인  


## 💡 소개
1. 컨테이너 클러스터 환경 구성
	> 단일노드 minikube로 쿠버네티스 클러스터 구성
2. 서버리스 구축
	> OpenFaas 설치, 운영 모니터링 도구 설치
3. 데이터 수집 서버 구축
	> 공공데이터 API를 활용하여 구성
4. Function 개발
	> OpenFaas 기반 Function 개발하여 서버리스 컴퓨팅 구성
  


## ⚙️  설정
### DB 비밀번호 생성
### k8s 폴더 전체 배포
`kubectl apply -f k8s`
### Ingress Nginx Controller 설치 후 실행
`minikube addons enable ingress`  
`minikube tunnel`  
`kubectl get pods -n ingress-nginx`
