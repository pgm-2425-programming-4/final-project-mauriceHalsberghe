export async function getTasks() {
  const result = await fetch("http://localhost:1337/api/tasks?populate=*",{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 72bc151436b18ce3ea9655702421698c871b9fb77d68e31c9f3154776aba43753ecbf459876fcdc8f98e227232edd454635d1ff9121b5abecf49875b712e7b26d5c285e783c61af6f71b549af48338c013351d73d273e47b93cfe304c080044636fdb165b4016bf185a1832f938b42e0f00a808dbbd860117b993283b1c19212",
    },
  });

  const data = await result.json();
  console.log(data.data);
  
  return data;
}