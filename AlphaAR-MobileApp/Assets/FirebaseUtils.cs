using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Firebase;
using Firebase.Database;
using Firebase.Storage;
using Firebase.Unity.Editor;
using System.Threading.Tasks;
using UnityEngine.Networking;
using System;
using Vuforia;

public class FirebaseUtils : MonoBehaviour
{
    private string modelName = "";

    // Start is called before the first frame update
    async void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public async void GetAssetBundleFromSession(string sessionId, System.Action<AssetBundle> todo)
    {
        /*Task<string> modelIdTask = GetModelIdAsync(sessionId);
        string modelId = await modelIdTask;

        Task<Uri> modelUriTask = GetModelAssetBundleUriAsync(modelId);
        Uri modelUri = await modelUriTask;
        string modelUriStr = modelUri.ToString();*/

        AssetBundle assetBundle = null;
        StartCoroutine(GetModelAssetBundle("https://firebasestorage.googleapis.com/v0/b/alpha-ar-1e5d6.appspot.com/o/y07%2Fsci01%2F01%2F05%2Fcells?alt=media&token=fd9a86dd-7873-4b37-9bc0-d9e67a9db781", result => assetBundle = result));
        StartCoroutine(InstantiateModel(assetBundle));
    }

    // Grab the model and asset bundle ID from Firebase RTDB
    private async Task<string> GetModelIdAsync(string sessionId)
    {
        string modelId = "";

        // Async get snapshot of entire DB
        FirebaseApp.DefaultInstance.SetEditorDatabaseUrl("https://alpha-ar-1e5d6.firebaseio.com/");
        DatabaseReference reference = FirebaseDatabase.DefaultInstance.RootReference;
        Task<DataSnapshot> task = FirebaseDatabase.DefaultInstance
            .GetReference("sessions")
            .GetValueAsync();
        DataSnapshot snapshot = await task;

        // Iterate through sessions until matching sessionId
        IEnumerable<DataSnapshot> sessionSnapshots = snapshot.Children;
        foreach (DataSnapshot sessionSnapshot in sessionSnapshots)
        {
            String sessionSnapshotId = sessionSnapshot.Child("sessionId").Value.ToString();
            if (sessionSnapshotId.Equals(sessionId))
            {
                modelId = sessionSnapshot.Child("modelId").Value.ToString();
            }
        }

        return modelId;
    }

    // Grab URL for model and asset bundle download link from Firebase Storage
    private async Task<Uri> GetModelAssetBundleUriAsync(string modelId)
    {
        Uri bundleURI = null;
        Debug.Log(bundleURI);

        FirebaseStorage storage = FirebaseStorage.GetInstance("gs://alpha-ar-1e5d6.appspot.com");
        StorageReference reference = storage.GetReferenceFromUrl("gs://alpha-ar-1e5d6.appspot.com");

        // Iterate through folders in Storage as per the modelId
        string[] path = modelIdParser(modelId);
        foreach (string folder in path)
        {
            reference = reference.Child(folder.ToLower());
            modelName = folder.ToLower();
        }
        Debug.Log(reference.Path);

        return await reference.GetDownloadUrlAsync();
    }

    // Grab model and asset bundle from Storage
    private IEnumerator GetModelAssetBundle(string modelUrl, System.Action<AssetBundle> todo)
    {
        UnityWebRequest www = UnityWebRequestAssetBundle.GetAssetBundle(modelUrl);
        Debug.Log("entered here");
        yield return www.SendWebRequest();

        if(www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
        }
        else
        {
            Debug.Log("success");
            todo(DownloadHandlerAssetBundle.GetContent(www));
        }
    }

    // Extract asset bundle and instantiate model, ready to be rendered in Vuforia
    private IEnumerator InstantiateModel(AssetBundle modelAssetBundle)
    {
        Debug.Log(modelAssetBundle);
        AssetBundleRequest modelReq = modelAssetBundle.LoadAssetAsync<GameObject>(modelName);
        yield return modelReq;

        AssetBundleRequest controllerReq = modelAssetBundle.LoadAssetAsync<GameObject>(modelName + "Controller");
        yield return controllerReq;

        GameObject prefab = modelReq.asset as GameObject;
        GameObject imageTarget = GameObject.Find("ImageTarget");

        RuntimeAnimatorController controller = controllerReq.asset as RuntimeAnimatorController;
        Animator animator = prefab.GetComponent<Animator>();
        animator.runtimeAnimatorController = controller;

        Instantiate<GameObject>(prefab, transform.parent = imageTarget.transform);
    }

    private string[] modelIdParser(string modelId)
    {
        string[] array = new string[5];
        array[0] = modelId.Substring(0, 3);
        array[1] = modelId.Substring(3, 5);
        array[2] = modelId.Substring(8, 2);
        array[3] = modelId.Substring(10, 2);
        array[4] = modelId.Substring(12);
        return array;
    }
}
