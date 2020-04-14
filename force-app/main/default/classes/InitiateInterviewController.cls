public with sharing class InitiateInterviewController {
    public InitiateInterviewController() {

    }
    @AuraEnabled
    public static String createInterview(String candidateData){
        system.debug('JSON => ' + candidateData);
        String result;
        if(candidateData!=null){
            Map<String, Object> inputStr = (Map<String, Object>)JSON.deserializeUntyped(candidateData);
            String resp = (String)inputStr.get('data');
            Map<String, Object> data = (Map<String, Object>)JSON.deserializeUntyped(resp);
            system.debug('data => ' + data);
            
            // Create Contact record and Interview Record.

            if(data.containskey('file')){
                String fileData = (String)data.get('file');
                // inserting file
                ContentVersion cv = new ContentVersion();
                cv.Title = (String)data.get('fileName');
                cv.PathOnClient = '/' + data.get('fileName');
                // todo: hardcoded public library folder
                cv.FirstPublishLocationId = '0583h000000LDV6AAO'; 
                // Decoding base64Data
                cv.VersionData = EncodingUtil.base64Decode(fileData);
                cv.IsMajorVersion = true;
                insert cv;
                system.debug('cs Id is => '+ cv.Id);
            }
        result = candidateData;
        }else{
            result= 'No Data';
        }

        return result;
    }
}
