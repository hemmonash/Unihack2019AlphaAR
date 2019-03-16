using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class APIUtils : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }

    // Get topic summary from Wikipedia
    public string GetWikiSummary(string topic)
    {
        string wikiJSON = "";
        StartCoroutine(GetWikiJSON(topic, result => wikiJSON = result));
        return ParseSummaryFromJSON(wikiJSON);
    }

    // Send request to Wikipedia for topic's page
    // Sets JSON response to passed variable reference
    private IEnumerator GetWikiJSON(string topic, System.Action<string> result)
    {
        string titleReq = "https://simple.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles={0}";

        UnityWebRequest www = UnityWebRequest.Get(string.Format(titleReq, topic));
        yield return www.SendWebRequest();
        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
        }
        else
        {
            result(www.downloadHandler.text);
        }
    }

    // Parse the JSON to return plaintext
    private string ParseSummaryFromJSON(string titleJSON)
    {
        // Trim off left side of summary
        string summaryPrefix = "extract";
        int summaryIndex = titleJSON.IndexOf(summaryPrefix) + summaryPrefix.Length + 3;
        string trimLeft = titleJSON.Substring(summaryIndex);

        // Trim off right side of summary
        int summaryEnd = trimLeft.LastIndexOf("\"");
        string summary = trimLeft.Substring(0, summaryEnd);

        // Remove wrongly formatted escaped characters
        summary = summary.Replace("\\n", "");
        summary = summary.Replace("\\\"", "");

        return summary;
    }
}