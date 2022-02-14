파일 다운로드 후 해야 할 일 .

1  docker build -t lbg030/multi-client . [client 폴더가서 진행, 자신의 DockerHub 아이디를 입력할 것.]
2.  docker build -t lbg030/multi-server . [server 폴더가서 진행, 자신의 DockerHub 아이디를 입력할 것.]
3.  docker push로 client와 server 올리기.
4.  docker-composeup --build
5.  localhost:3050번으로 접속해서 잘 작동하는지 확인해보기.
--- 여기까지가 1차 끝 --

1.  kubectl create secret generic pgpassword --from-literal PGPASSWORD=12345test
2.  client-deployment.yaml , server-deployment.yaml 파일에 이미지 이름 변경 .


------------------------------------------------------------------------------------------------------
--> Apple 칩 Mac 기준
1. minikube addons enable ingress
2. minikube tunnel [sudo코드 입력하면 끝. 터미널 한개 켜두기]
3. <img width="464" alt="스크린샷 2022-02-14 오후 3 38 00" src="https://user-images.githubusercontent.com/66514138/153812659-5fbbc5b6-d8e7-4534-9320-1c040ed20327.png">

------------------------------------------------------------------------------------------------------


3.  kubectl apply -f k8s
4.  kubectl get all [정상적으로 작동 되는지 확인]
5.  localhost [포트번호 없이 정상적으로 접속되면 성공.]
